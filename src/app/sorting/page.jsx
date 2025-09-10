"use client";

import React, { Component } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { Github, Linkedin } from "lucide-react";
import {
  bubbleSort,
  insertionSort,
  quickSort,
  selectionSort,
} from "@/lib/algorithms/sortingAlgo";
import Rects from "./rects";
import Menu from "./menu";
import CodeBlock from "@/components/ui/snippet";
import ComplexityBoxes from "@/components/ui/complexityBox";

class Sort extends Component {
  state = {
    count: 20,
    rects: [],
    rects2: [],
    doubles: false,
    speed: 50,
    isRunning: false,
    isRunning1: false,
    isRunning2: false,
    algo1: 0,
    algo2: 0,
    isOpen: false,
  };

  // lookup table for code + complexity
  algoDetails = {
    0: {
      code: `
function bubbleSort(arr) {
  for (let i=0; i<arr.length; i++) {
    for (let j=0; j<arr.length-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}`,
      complexity: {
        time: "Best: O(n)\nAverage: O(n^2)\nWorst: O(n^2)",
        space: "O(1)",
        notes: "Stable algorithm, good for small datasets, inefficient for large n.",
      },
    },
    1: {
      code: `
function selectionSort(arr) {
  for (let i=0; i<arr.length; i++) {
    let minIdx = i;
    for (let j=i+1; j<arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
      complexity: {
        time: "Best: O(n^2)\nAverage: O(n^2)\nWorst: O(n^2)",
        space: "O(1)",
        notes: "Not stable, always scans the entire unsorted array.",
      },
    },
    2: {
      code: `
function insertionSort(arr) {
  for (let i=1; i<arr.length; i++) {
    let key = arr[i], j = i-1;
    while (j >= 0 && arr[j] > key) {
      arr[j+1] = arr[j];
      j--;
    }
    arr[j+1] = key;
  }
  return arr;
}`,
      complexity: {
        time: "Best: O(n)\nAverage: O(n^2)\nWorst: O(n^2)",
        space: "O(1)",
        notes: "Stable, adaptive, efficient for nearly-sorted data.",
      },
    },
    3: {
      code: `
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [], right = [];
  for (let i=0; i<arr.length-1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
      complexity: {
        time: "Best: O(n log n)\nAverage: O(n log n)\nWorst: O(n^2)",
        space: "O(log n)",
        notes:
          "Not stable in its typical implementation, very efficient in practice.",
      },
    },
  };

  componentDidMount() {
    const rect = getInitialRects(this.state.count);
    const rect2 = rect.slice();
    this.setState({ rects: rect, rects2: rect2 });
  }

  render() {
    const navItems = [
      { name: "Home", link: "/" },
      { name: "Sorting", link: "sorting" },
      { name: "About", link: "/about" },
    ];

    const { algo1 } = this.state;
    const { code, complexity } = this.algoDetails[algo1];

    return (
      <div className="flex flex-col min-h-screen bg-white text-black">
        {/* Navbar */}
        <Navbar className="py-4 px-6 shadow-md bg-white/80 backdrop-blur-sm fixed top-2 left-1/2 -translate-x-1/2 w-[95%] rounded-2xl z-50">
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              <NavbarButton
                href="https://github.com/cinearchie"
                className="flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
              </NavbarButton>
              <NavbarButton
                href="https://linkedin.com/in/archishmanadhikari"
                className="flex items-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
              </NavbarButton>
            </div>
          </NavBody>

          {/* Mobile Nav */}
          <MobileNav visible>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={this.state.isOpen}
                onClick={() => this.setState({ isOpen: !this.state.isOpen })}
              />
            </MobileNavHeader>
            <MobileNavMenu
              isOpen={this.state.isOpen}
              onClose={() => this.setState({ isOpen: false })}
            >
              {navItems.map((item, idx) => (
                <a key={idx} href={item.link} className="text-lg">
                  {item.name}
                </a>
              ))}
            </MobileNavMenu>
          </MobileNav>
        </Navbar>

        {/* Sorting Visualizer Content */}
        <div className="flex flex-1 overflow-hidden pt-24">
          {/* Settings Menu */}
          <div className="mt-6 ml-6">
            <div className="rounded-xl shadow-md bg-white p-4">
              <Menu
                disable={this.state.isRunning}
                onDoubleChange={this.handleDouble}
                onViusalize={this.handleSort}
                onRandomize={this.handleRandomize}
                onRefresh={this.handleRefresh}
                onCountChange={this.handleCountChange}
                onAlgoChanged1={this.handleAlgoChanged1}
                onAlgoChanged2={this.handleAlgoChanged2}
                onSpeedChange={this.handleSpeedChanged}
              />
            </div>
          </div>

          {/* Visualization Area */}
          <div className="flex flex-1 flex-col items-center justify-center overflow-auto">
            <Rects speed={this.state.speed} rects={this.state.rects} />
            {this.state.doubles && <hr style={{ width: "90%" }} />}
            {this.state.doubles && <Rects rects={this.state.rects2} />}
          </div>
        </div>

        {/* Code + Complexity side by side */}
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="flex-1">
            <CodeBlock code={code} />
          </div>
          <div className="flex-1">
            <ComplexityBoxes complexity={complexity} />
          </div>
        </div>
      </div>
    );
  }

  handleRandomize = () => {
    const rect = getInitialRects(this.state.count);
    const rect2 = rect.slice();
    this.setState({ rects: rect, rects2: rect2 });
  };

  handleRefresh = () => {
    const rects = this.state.rects.map((r) => ({
      ...r,
      isSorted: false,
      isSorting: false,
    }));
    this.setState({ rects, rects2: rects.slice() });
  };

  handleDouble = (val) => this.setState({ doubles: val });

  handleCountChange = (val) => {
    const rect = getInitialRects(val);
    const rect2 = rect.slice();
    this.setState({ count: val, rects: rect, rects2: rect2 });
  };

  handleAlgoChanged1 = (val) => this.setState({ algo1: val });

  handleAlgoChanged2 = (val) => this.setState({ algo2: val });

  handleSpeedChanged = (val) => this.setState({ speed: 760 - val * 7.5 });

  handleSort = () => {
    this.setState({ isRunning: true });
    let steps1;
    switch (this.state.algo1) {
      case 0:
        steps1 = bubbleSort(this.state.rects);
        break;
      case 1:
        steps1 = selectionSort(this.state.rects);
        break;
      case 2:
        steps1 = insertionSort(this.state.rects);
        break;
      case 3:
        steps1 = quickSort(this.state.rects);
        break;
      default:
        steps1 = bubbleSort(this.state.rects);
        break;
    }
    let steps2;
    if (this.state.doubles) {
      switch (this.state.algo2) {
        case 0:
          steps2 = bubbleSort(this.state.rects2);
          break;
        case 1:
          steps2 = selectionSort(this.state.rects2);
          break;
        case 2:
          steps2 = insertionSort(this.state.rects2);
          break;
        case 3:
          steps2 = quickSort(this.state.rects2);
          break;
        default:
          steps2 = bubbleSort(this.state.rects2);
          break;
      }
    }
    this.handleFirst(steps1);
    if (this.state.doubles) this.handleSecond(steps2);
  };

  handleFirst = async (steps) => {
    this.setState({ isRunning1: true });
    let prevRect = [...this.state.rects];

    for (let i = 0; i < steps.length; i++) {
      prevRect = [...prevRect];

      if (i !== 0) {
        prevRect[steps[i - 1].xx] = {
          ...prevRect[steps[i - 1].xx],
          isSorting: false,
        };
        prevRect[steps[i - 1].yy] = {
          ...prevRect[steps[i - 1].yy],
          isSorting: false,
        };
      }

      if (steps[i].xx === steps[i].yy) {
        prevRect[steps[i].xx] = {
          ...prevRect[steps[i].xx],
          isSorted: true,
          isSorting: false,
        };
      } else if (steps[i].changed) {
        [prevRect[steps[i].xx], prevRect[steps[i].yy]] = [
          { ...prevRect[steps[i].yy], isSorting: true },
          { ...prevRect[steps[i].xx], isSorting: true },
        ];
      } else {
        prevRect[steps[i].xx] = {
          ...prevRect[steps[i].xx],
          isSorting: true,
        };
        prevRect[steps[i].yy] = {
          ...prevRect[steps[i].yy],
          isSorting: true,
        };
      }

      this.setState({ rects: prevRect });

      if (i === steps.length - 1) {
        this.setState({ isRunning1: false });
        if (!this.state.isRunning2) this.setState({ isRunning: false });
      }

      await sleep(this.state.speed);
    }
  };

  handleSecond = async (steps) => {
    this.setState({ isRunning2: true });
    let prevRect = [...this.state.rects2];

    for (let i = 0; i < steps.length; i++) {
      prevRect = [...prevRect];

      if (i !== 0) {
        prevRect[steps[i - 1].xx] = {
          ...prevRect[steps[i - 1].xx],
          isSorting: false,
        };
        prevRect[steps[i - 1].yy] = {
          ...prevRect[steps[i - 1].yy],
          isSorting: false,
        };
      }

      if (steps[i].xx === steps[i].yy) {
        prevRect[steps[i].xx] = {
          ...prevRect[steps[i].xx],
          isSorted: true,
          isSorting: false,
        };
      } else if (steps[i].changed) {
        [prevRect[steps[i].xx], prevRect[steps[i].yy]] = [
          { ...prevRect[steps[i].yy], isSorting: true },
          { ...prevRect[steps[i].xx], isSorting: true },
        ];
      } else {
        prevRect[steps[i].xx] = {
          ...prevRect[steps[i].xx],
          isSorting: true,
        };
        prevRect[steps[i].yy] = {
          ...prevRect[steps[i].yy],
          isSorting: true,
        };
      }

      this.setState({ rects2: prevRect });

      if (i === steps.length - 1) {
        this.setState({ isRunning2: false });
        if (!this.state.isRunning1) this.setState({ isRunning: false });
      }

      await sleep(this.state.speed);
    }
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getInitialRects = (tot) => {
  const rects = [];
  for (let i = 0; i < tot; i++) rects.push(getRect(i));
  return rects;
};

const getRect = (kk) => ({
  width: Math.floor(Math.random() * 200) + 50,
  isSorted: false,
  isSorting: false,
  kk,
});

export default Sort;
