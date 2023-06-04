/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    
    // Sorted Array
    for(let i =0; i < nums.length;i++){
        if(nums[i] < 1) {
            nums[i] = nums.length + 1;
        }
    }
    
    // Set index of array to negative for each elemt
    for(let i =0; i < nums.length;i++){
        const absNum = Math.abs(nums[i]);
        if (absNum <= nums.length) {
            nums[absNum-1] = -Math.abs(nums[absNum-1]);
        }
    }
    
    // Iterate through index to find first non negative elemt
    for(let i =0; i < nums.length;i++){
        if(nums[i] > 0) {
            return i+1;
        }
    }

    return nums.length+1;
};
