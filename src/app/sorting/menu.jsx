import { CustomSelect } from '@/components/custom-select';
import { CustomSlider } from '@/components/custom-slider';
import { CustomToggle } from '@/components/custom-toggle';
import { Button } from '@/components/ui/button';
import { Component } from 'react';

class Menu extends Component {
  isClickable = () => {
    if (this.props.disable) {
      return { cursor: "not-allowed" };
    } else {
      return {};
    }
  };

  render() {
    return (
      <div className="w-72 h-full p-6 space-y-6 
                      bg-white/70 backdrop-blur-md shadow-xl 
                      border border-gray-200 rounded-r-2xl">
        <h2 className="text-xl font-bold text-gray-800">⚙ Settings</h2>

        <CustomSlider
          title="Numbers"
          defaultValue={20}
          min={10}
          max={100}
          step={1}
          onChange={this.props.onCountChange}
          disable={this.props.disable}
        />

        <CustomSlider
          defaultValue={50}
          title="Speed"
          onChange={this.props.onSpeedChange}
          min={10}
          max={100}
          step={1}
          disable={this.props.disable}
        />

        <CustomSelect
          title="Select Algorithm 1"
          options={["Bubble Sort", "Selection Sort", "Insertion Sort", "Quick Sort"]}
          onChange={this.props.onAlgoChanged1}
        />

        <CustomToggle
          title="Double"
          onCheckedChange={this.props.onDoubleChange}
        />

        <CustomSelect
          title="Select Algorithm 2"
          options={["Bubble Sort", "Selection Sort", "Insertion Sort", "Quick Sort"]}
          onChange={this.props.onAlgoChanged2}
        />

        <div className="flex flex-col gap-3 pt-2">
          <Button
            className="w-full rounded-xl font-medium"
            onClick={this.props.onRandomize}
            disabled={this.props.disable}
            style={this.isClickable()}
          >
            Randomize
          </Button>

          <Button
            className="w-full rounded-xl font-medium bg-blue-600 hover:bg-blue-700 text-white"
            onClick={this.props.onViusalize}
            disabled={this.props.disable}
            style={this.isClickable()}
          >
            Visualize
          </Button>
        </div>
      </div>
    );
  }
}

export default Menu;
