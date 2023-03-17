// Data array
const data = [  {    
    name: "root",    
    children: [
        "XYZ", 
        "DEF",
    ]
  },
  {
    name: "XYZ",
    children: [
        "PQR",
        "JKL"
    ]
  },
  {
    name: "DEF",
    children: []
  },
  {
    name: "PQR",
    children: []
  },
  {
    name: "JKL",
    children: ["GHI"]
  },
  {
    name: "GHI",
    children: []
  }
];

// Function to transform the data
function transformData(data) {
    // Find the root node in the data array
    const root = data.find(item => item.name === "root");
    
    // Create an array for the children of the root node
    const children = [];
  
    // For each child node of the root node
    root.children.forEach(childName => {
      // Look for the corresponding child object in the data array
      const child = data.find(item => item.name === childName);
      
      // If the child object is found
      if (child) {
        // Create an array to hold the grandchildren of the child node
        const grandchildren = child.children.map(grandchildName => {
          // Look for the corresponding grandchild object in the data array
          const grandchild = data.find(item => item.name === grandchildName);
          
          // If the grandchild object is found
          return grandchild ? {
            // Create a new object with the grandchild's name and an empty children array
            name: grandchildName,
            children: grandchild.children.map(gcName => ({
              // Create a new object with the great-grandchild's name and an empty children array
              name: gcName,
              children: []
            }))
          } : null;
        }).filter(gc => gc !== null);
  
        // Add the child node to the children array with its grandchildren
        children.push({
          name: childName,
          children: grandchildren
        });
      }
    });
  
    // Return an object with the root node's name and its children
    return {
      name: root.name,
      children
    };
}
  
// Log the transformed data in a readable JSON format
console.log(JSON.stringify(transformData(data), null, 2))