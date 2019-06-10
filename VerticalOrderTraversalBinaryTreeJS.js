// create class Location so we can initialize a constructor function with the 
// following 'this' properties to inherit, namely, the x, y, and value parameters.
// this will be used to create an array of Location objects that contain each node's 
// specific x, y, and 'val' value.
class Location {
    constructor (x, y, val) {
        this.x = x;
        this.y = y;
        this.val = val;
    }
}

// the compare function to be used with the javascript's array prototype sort function 
// where if there is more than one Location object at a specific x coordinate, then
// we sort through it and compare the first Location's object y coordinate with the second Location's object y coordinate (using subtraction)
// if negative, the first object is indexed lower
// if zero, then left as is
// if positive, the second object is indexed lower
// then if two Location's object y coordinate is the same at a specific x coordinate, then we just subtract the value
// to determine the index order so that the lower node value is indexed lower

// NOTE: javascript's array prototype sort function will iterate through the store array,
// so parameters pos1 and pos2 will have different arguments passed in as sort function
// makes it way down the store array. 
const compareTo = (pos1, pos2) => {
    if (pos1.y !== pos2.y) {
        return pos1.y - pos2.y; 
    }
    return pos1.val - pos2.val;
}

// main function to call
const verticalTraversal = (root) => {
    // create an object which will be used to track the x,y coordinates for each node in the binary tree
    const store = {};

    // variables used to keep track of the most outer left and right x coordinates
    let leftMost = 0, rightMost = 0;

    // helper function to push to the store object the x,y coordinates for each node using recursion
    const helper = (node, x, y) => {
        // base case for recursion
        if (!node) {
            return;
        }

        // if current x coordinate is less than most left x coordinate
        if (x < leftMost) {
            leftMost = x;
        }

        // if current x coordinate is greater than most right x coordinate
        if (x > rightMost) 
        {
            rightMost = x;
        }

        // if our store object does not contain a property at x coordinate, then
        // create one with an empty array which will be used to store future Location objects
        if (!store[x]) {
            store[x] = [];
        }

        // once the empty array at x coordinate in the store object has been created,
        // then fill it with a new Location object with the 
        // current x, y coordinates and current root node value
        store[x].push(new Location(x, y, node.val));
        
        // for left node child, decrease x by one, but always add one to y for easier sorting
        // for right node child, increase x by one
        // logically, it makes sense to decrease y by one, since we are starting from the top root node (0,0)
        // but by increasing y by one, it makes the sorting easier below
        helper(node.left, x-1, y+1);
        helper(node.right, x+1, y+1);
    }
    // initialize the helper function with the root and 
    // start with its root node's x, y coordinate as (0,0)
    helper(root, 0, 0);

    // create array variable used to keep track of the sorted node values
    const results = [];

    // this while loop can be done in one line, but I broke it down as such
    // for easier reference when trying to understand this algorithm
    // loop through the store array 
    // start from the most left child node which should be at the greatest negative x coordinate (leftMost)
    // then sort the values of all the Location objects at each specific x coordinate
    // then push just the sorted values into the results array and return it
    while (leftMost <= rightMost) {
        let sortedNodes = store[leftMost++].sort(compareTo);
        let sortedValues = sortedNodes.map(node => node.val)
        results.push(sortedValues);
    }

    return results;
}

// Test case for when trying to see the above algorithm in action (i.e. use pythontutor.com)
//verticalTraversal({"$id":"1","left":{"$id":"2","left":{"$id":"3","left":null,"next":null,"right":null,"val":4},"next":null,"right":{"$id":"4","left":null,"next":null,"right":null,"val":5},"val":2},"next":null,"right":{"$id":"5","left":{"$id":"9","left":null,"next":null,"right":null,"val":6},"next":null,"right":{"$id":"6","left":null,"next":null,"right":null,"val":7},"val":3},"val":1}) 
 