# Plot.ly Homework - Belly Button Biodiversity

![Bacteria by filterforge.com](Images/bacteria.jpg)

In this assignment, you will build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Deploying to Heroku
** Create your requirements.txt **
pip freeze > requirements.txt

** Can later use this to install **
pip install -r requirements.txt

### Homework Requirements/Deliverables
| Step  | √ | Requirement |
| Step | √ | Requirement |
| :---: | :---: | :--- 
| 01 | √ | Use the D3 library to read in `samples.json` and create an interactive dashboard using Plotly JS (hw02.png)
| 01 | √ | Update all of the plots any time that a new sample is selected.
| 02 | √ | Deploy your app to a free static page hosting service - https://plotly-belly-button-sw.herokuapp.com/


### Development Requirements
| Step | √ | Requirement |
| :---: | :---: | :--- 
| 01 | √ | ** Bar Chart** Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual. (hw01.png)
| 02 | √ | 	- Use `sample_values` as the values for the bar chart.
| 03 | √ | 	- Use `otu_ids` as the labels for the bar chart.
| 04 | √ | 	- Use `otu_labels` as the hovertext for the chart.
| 05 | √ | ** Bubble Chart ** Create a bubble chart that displays each sample.
| 06 | √ |    - Use `otu_ids` for the x values.
| 07 | √ |    - Use `sample_values` for the y values.
| 08 | √ |    - Use `sample_values` for the marker size.
| 09 | √ |    - Use `otu_ids` for the marker colors.
| 10 | √ |    - Use `otu_labels` for the text values.
| 11 | √ | ** Demographics ** - Display the sample metadata, i.e., an individual's demographic information. (hw03.png)
| 12 | √ | ** Misc ** - Display each key-value pair from the metadata JSON object somewhere on the page.
| 13 | √ |    - Update all of the plots any time that a new sample is selected.
| 14 | √ |    - Deploy your app to a free static page hosting service - https://plotly-belly-button-sw.herokuapp.com/

### Bonus / Optional
| Step | √ | Requirement |
| :---: | :---: | :--- 
| 01 |  | Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.
| 02 |  |    - modify the example gauge code to account for values ranging from 0 through 9.
| 03 |  |    - Update the chart whenever a new sample is selected.

### From the grading rubric pdf:
| Step | √ | Requirement |
| :---: | :---: | :--- 
| 01 | √ | ** Bar Chart ** - loads without error
| 02 | √ |    - updates when a new sample is loaded
| 03 | √ |    - Top 10 sample values as values
| 04 | √ |    - `otu_id` as labels
| 05 | √ |    - `otu_labels` as hover text
| 06 | √ | ** Bubble Chart ** - loads without error
| 07 | √ |    - updates when a new sample is loaded
| 08 | √ |    - `otu_id` as x values
| 09 | √ |    - `otu_id` for marker colors
| 10 | √ |    - `sample_values` for y values
| 11 | √ |    - `sample_values` for marker size
| 12 | √ |    - `otu_labels` for text values
| 13 | √ | ** Metadata & Deployment ** 
| 14 | √ |    - metadata initializes w/o error
| 15 | √ |    - metadata updates when a new sample is selected
| 16 | √ |    - deployed to github free hosting / Heroku / etc - https://plotly-belly-button-sw.herokuapp.com/