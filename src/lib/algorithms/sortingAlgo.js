export function bubbleSort(arr){
    const pairs= [];
    let n = arr.length;
    const prevRect = arr.slice();
    for (let i = 0; i < n-1; i++){
        for (let j = 0; j < n-i-1; j++){
            if (prevRect[j].width > prevRect[j+1].width) {
                // swap arr[j+1] and arr[j]
                const recti = {...prevRect[j]};
                const rectj = {...prevRect[j+1]};
                prevRect[j+1] = recti;
                prevRect[j] = rectj;
                pairs.push( {
                    xx:j,
                    yy:j+1,
                    changed:true
                } );
            } else{
                pairs.push( {
                    xx:j,
                    yy:j+1,
                    changed:false
                } );
            }
            if( j === n-i-2 ){
                pairs.push( {
                    xx:n-i-1,
                    yy:n-i-1,
                    changed:false
                } );
            }
        }
    }
    pairs.push({
            xx:0,
            yy:0,
            changed:false
        }
    )
    return pairs;
}

export function selectionSort(rects){
    const pairs = [];
    const num = rects.length;
    const prevRect = rects.slice();

    for(let i = 0; i < num - 1; i++){
        let min_idx = i;
        for(let j = i + 1; j < num; j++){
            pairs.push({
                xx: min_idx,
                yy: j,
                changed: false
            })
            if(prevRect[j].width < prevRect[min_idx].width){
                min_idx = j;
            }
        }
        const recti = {...prevRect[i]};
        const rectj = {...prevRect[min_idx]};

        prevRect[min_idx] = recti;
        prevRect[i] = rectj;

        pairs.push({
            xx: min_idx,
            yy: i,
            changed: true
        })
        pairs.push({
            xx: i,
            yy: i,
            changed: false
        })
    }
    pairs.push({
        xx: num - 1,
        yy: num - 1,
        changed: false
    })
    return pairs
}

export function insertionSort(rects){
    const pairs = [];
    const num = rects.length;
    const prevRect = rects.slice();
    for (let i = 1; i < num; ++i) {
        let key = prevRect[i].width;
        let j = i - 1;

        while (j >= 0 && prevRect[j].width > key) {
            const recti = {...prevRect[j]};
            const rectj = {...prevRect[j+1]};
            prevRect[j+1] = recti;
            prevRect[j] = rectj;
            pairs.push( {
                xx:j,
                yy:j+1,
                changed:true
            } );
            j = j - 1;
        }
       // arr[j + 1] = arr[i];
    }
    for(let i=0;i<num;i++){
        pairs.push({
            xx:i,
            yy:i,
            changed:true
        })
    }
    return pairs;
}
export function quickSort(rects) {
    const pairs = [];
    const arr = rects.slice();
  
    function swap(i, j) {
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  
    function partition(low, high) {
      let pivot = arr[high].width;
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        pairs.push({
          xx: j,
          yy: high,
          changed: false
        });
  
        if (arr[j].width < pivot) {
          i++;
          swap(i, j);
          pairs.push({
            xx: i,
            yy: j,
            changed: true
          });
        }
      }
  
      swap(i + 1, high);
      pairs.push({
        xx: i + 1,
        yy: high,
        changed: true
      });
  
      return i + 1;
    }
  
    function quick(low, high) {
      if (low < high) {
        const pi = partition(low, high);
  
        // mark pivot as sorted
        pairs.push({
          xx: pi,
          yy: pi,
          changed: false
        });
  
        quick(low, pi - 1);
        quick(pi + 1, high);
      }
    }
  
    quick(0, arr.length - 1);
  
    // mark all as sorted at the end
    for (let i = 0; i < arr.length; i++) {
      pairs.push({
        xx: i,
        yy: i,
        changed: false
      });
    }
  
    return pairs;
  }
  