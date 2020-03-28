// Variables to hold data:
var samples = [], names = [], metadata = [];
// Variable to capture what the user selected in the drop down
var selectedName = ''
// My own variables
var debug = false;

// 1. On page load, load JSON data 
// 2. Use arrow functions to process each incoming row
// 3. Create the page interactions using functions
d3.json("static/js/samples.json").then((jsonFile) => {
  if(debug){
    console.log('02. JSON loaded: ' + JSON.stringify(jsonFile));
  }
  else {
    console.log('02. JSON loaded');
  }
  
  // JSON file has three elements: "names", "metadata", and "samples"
  names = jsonFile.names;
  metadata = jsonFile.metadata;
  samples = jsonFile.samples;
  
  // Display the demographics for the first item in the drop down list:
  selectedName = names[0];

  // Load the OTU for the drop down:
  populateDropDownList(names);
  
  // Demographics:
  dropDownSelectedEvent(selectedName);

  // Create the bar plot
  plotBar(selectedName);

  // Bonus:
  plotGauge(selectedName);

  // Bubble it up!
  plotBubble(selectedName);
});

/*
  #################################################
  Plots!
  #################################################
*/

// Requirements: "** Bubble Chart ** Create a bubble chart that displays each sample."
function plotBubble(selectedName) {
    // "selectedName" variable is populated in the "optionChanged()" function
    // Filter the samples to return only that name's data

    var chosen = samples.filter(function(item){
      return item.id == Number(selectedName);
    })[0];

    // Requirements: - Use `otu_ids` for the x values.
    var otu_ids = chosen.otu_ids;

    // Requirements: - Use `sample_values` for the y values.
    var all_samples = chosen.sample_values;    
    
    // Requirements: - Use `otu_labels` for the text values.
    var labels = chosen.otu_labels;

    // Create the trace
    var trace = {
        x: otu_ids,
        y: all_samples,
        text: labels,
        mode: 'markers',
        marker: {
          opacity: [1, 0.8, 0.6, 0.4],
          color: otu_ids, // Requirements: - Use `otu_ids` for the marker colors.
          colorscale: 'Viridis',
          size: all_samples // Requirements: - Use `sample_values` for the marker size.
        }
    };

    // Assign title
    var layout = {
      title: 'OTU ID'
    };

    // Place the trace into an array
    var data = [trace];
    
    // Requirements: Plot!
    Plotly.newPlot('bubble', data, layout);

    if(debug){
      console.log('05. Bubble plot created: ' + JSON.stringify(chosen));
    }
    else {
      console.log('05. Bubble plot created for Subject ID #' + chosen.id);
    }
}

// Requirements: ** Bar Chart** Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual. (hw01.png)
function plotBar() {
    // "selectedName" variable is populated in the "optionChanged()" function
    // Filter the samples to return only that name's data
  var chosenName = samples.filter(function(item){
    return item.id == Number(selectedName)
  })[0];
  
  if(debug){
    console.log('04. Bar plot created: ' + JSON.stringify(chosenName));
  }
  else {
    console.log('04. Bar plot created for Subject ID #' + chosenName.id);
  }

  // Only plot the top n values
  var howMany = 10;

  // Requirements: "Use `sample_values` as the values for the bar chart."
  // Rubric: - Top 10 sample values as values
  // top_samples.forEach(element => console.log(element));
  
  // console.log(chosenName.sample_values);
  
  // var top_samples = chosenName.sample_values.sort((a,b) => b-a).slice(0, howMany).reverse;
  // console.log(top_samples);
  var top_samples = chosenName.sample_values.slice(0, howMany).reverse();
  // console.log(top_samples);
  
  // Requirements: "Use `otu_ids` as the labels for the bar chart."
  var labels = chosenName.otu_ids.slice(0, howMany).map(function(item){
      return "OTU " + item;
  }).reverse();

  // Requirements: - Use `otu_labels` as the hovertext for the chart.
  var hoverText = chosenName.otu_labels.slice(0, howMany).reverse();

  // Create the raw trace
  var trace = {
      type: "bar",
      orientation: "h", 
      x: top_samples, // Rubric: "otu_id` as x values"
      y: labels, 
      text: hoverText // Rubric: `otu_labels` as hover text
  };

  // Place the trace into an array
  var data = [trace];

  // Pass the array to plotly and target the div w id="bar"
  Plotly.newPlot("bar", data);
}


// Populate drop-down list
function populateDropDownList(names) {
  names.forEach(function(name) {
    $("#selDataset").append(new Option(name, name)); // "name" is both the display and selected value
  });
}

/*
  ###############################################
  Bonus
  ###############################################
*/

// Requirements: "** Bubble Chart ** Create a bubble chart that displays each sample."
function plotGauge(selectedName) {
  // "selectedName" variable is populated in the "optionChanged()" function
  // Filter the metadata to return only that name's data

  var chosen = metadata.filter(function(item){
    return item.id == Number(selectedName);
  })[0];

  // When the user selects a test subject in drop down, set the needle to chosen.wfreq
  // The gauge's min/max is the min/max of that column

  // Requirements: - Use `wfreq` for the y values.
  var washFreq = chosen.wfreq;
  console.log(chosen.id);
  var data = [
    {
      domain: { x: [1, 9], y: [1, 9] },
      value: chosen.wfreq,
      title: { text: "Scrubs per week" },
      type: "indicator",
      mode: "gauge+number+indicator",
      gauge: {
        axis: { range: [null, 9] },
        steps: [
          { range: [0, 1], color: "white" },
          { range: [1, 2], color: "lightgray" },
          { range: [2, 3], color: "cyan" },
          { range: [3, 4], color: "blue" },
          { range: [4, 5], color: "royalblue" },
          { range: [5, 6], color: "RebeccaPurple" },
          { range: [6, 7], color: "pink" },
          { range: [8, 9], color: "orange" }
        ]
      }
    }
  ];
  
  var layout = { 
    width: 600, 
    height: 450, 
    title: "The Title",
    margin: { t: 0, b: 0 } 
  };
  
  Plotly.newPlot('gauge', data, layout);

  if(debug){
    console.log('06. Gauge created: ' + JSON.stringify(chosen));
  }
  else {
    console.log('06. Gauge created for Subject ID #' + chosen.id);
    console.log('   ... wfreq: ' + washFreq);
    console.log('06. Gauge created: ' + JSON.stringify(chosen.wfreq));
  }
}


/*
  ######################################################
    Event handlers
  ######################################################
*/
// Called when user selects an item in the drop down:
function dropDownSelectedEvent(selectedName) {
    // "selectedName" variable is populated in the "optionChanged()" function
    // Filter the metadata to return only that name's data
    var chosen = metadata.filter(function(testSubject){
        return testSubject.id == Number(selectedName);
    })[0];
    console.log('03. Selected: ' + chosen.id + " [inside dropDownSelectedEvent()]")

    $('#id').text(chosen.id);
    $('#ethnicity').text(chosen.ethnicity);
    $('#gender').text(chosen.gender);
    $('#age').text(chosen.age);
    $('#location').text(chosen.location);
    $('#bbtype').text(chosen.bbtype);
    $('#wfreq').text(chosen.wfreq);
}

// Javascript drop down event handler:
function optionChanged(name){
  if (name !== '-1') {
    console.log('')
    console.log('---------------------------------')
    console.log('Drop-down list item selected')
    console.log('---------------------------------')
    console.log('01. Drop-down list item selected');
    console.log('02. User selected #' + name + " [via optionChanged()]");

    // Assign "selectedName" - this is what the functions for plotting need as input/filter
    selectedName = name;
    dropDownSelectedEvent(selectedName);
    plotBar(selectedName);
    plotGauge(selectedName);
    plotBubble(selectedName);
  }
}

$(document).ready(function(){
  console.log('01. document.ready()')
})
