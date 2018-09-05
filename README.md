# SAFC Budgeting Tool

This budgeting tool uses the [https://github.com/chentsulin/electron-react-boilerplate]electron-react-boilerplate. For all questions concerning deployment, updating the baseline, and all code not in the `./app` directory, please see their documentation.

## Rationale
In the Spring 2018 Semester, the SAFC zero funded nearly 20% of organizations due to preventable budget mistakes. This tool will serve as a measure to help organizations have all correct information, caps, and documentation in a single easy to read PDF

## The Generator Framework
As the requirements of the SAFC budget's change every semester, the tool needs to easily modifiable. The tool must also be able to provide supporting calculators and Pages

For this reason, the website should be generated from configuration files. Examples of these can be found in `app/budgetSections` and `app/budgetInfo`. The idea behind this framework is that *the code itself should never have to be edited*. Sections and lists are easily generated from js config files, which can be easily read and modified with rudimentary knowledge of programming. Adding budget sections or lists is also easy, simply instantiate a new instance in `app/utils/lists.js` or `app/utils/sectionGenerator.js`. The PDFs generated are fully configurable by the webmaster by changing the constants at the top of `app/utils/pdfGenerator.js`

JS config files are used to generate budgeting pages, which include calculators and actual forms, and lists, which are budgeting pages that contain no input fields. When creating a budgetting page, the user gets to set a variety of fields. They are
* `name` (**required**) - The name of the page
* `title` (**required**) - The title of the page to be displayed at the top of the screen
* `save_text` - The text of the save button for the page. Default's to "save to budget"
* `max` - The max allocated funding for this section of the budget
* `repeat` - An array of `RepeatedFields` that will be displayed
* `single` - An array of `Fields` that will be displayed
* `links` - An array of `Links` that will be added to the bottom of the page

### RepeatedFields
RepeatedFields are themselves objects which contain `Field` objects
They have the following object fields
* `name` (**required**) - The name of the repeated field
* `addButton` - The text of the add button. Defaults to "Add"
* `defaultTriggerText` - The default text for the repeated field's collapse trigger. Defaults to "Item"
* `removeButton` - The default text for the repeated field's remove button. Defaults to "Remove"
* `values` - An array of `Fields` for the repeated field to contain

### Fields
Fields get to the crux of the generator. These are the objects that get transformed into Redux Form Field objects. They contain the following fields
* `name` (**required**) - The name of the repeated field
* `label` - The label to be displayed above the input of the field
* `type` - The type of the field. Can include
  * `text` (**Default**) - A single line text box
  * `textarea` - A multiline text area
  * `file` - A file input
  * `checkbox` - A checkable box
  * `select` - A select box. If this type is used, a required prop `options` must also be set containing an array of options
  * `numeric` - A numeric text box
* `errorMessage` - The error message to display if a field is left blank. If the field is not required, do not put an error message
* `min` - If the type if numeric, the min value of textbox. If the type is text based, the min number of characters allowed
* `max` - If the type if numeric, the max value of the textbox. If the type is text based, the max number of characters allowed
* `message` - Either a string or a `List` that will be displayed below the field
* `pdf` - A function that takes in a string as an input and has a string as an output. This function will be applied to the value before being displayed in the pdf. A common usage is adding a dollar sign or units to a particular value to make it clearer to the user

### Lists
Lists are recursive structures. Every list has
* `title` - the title of the list
* `list` - An array where each element is either a string or a nested `List` objects
* `type` - Either "bullet" or "numeric"

See any of the FAQs in `app/budgetInfo` for good Examples

### Links
Links are simple objects. They contain two fields
* `Label` - The text of this link
* `Link` - The href to navigate to


The important files to the generator framework are `formGenerator.js`, `sectionGenerator.js`, `ListGenerator.js` and `PDFGenerator.js`. These files contain the instructions for interpreting the js files and turning them into renderable code or PDFs.

## PDFs
The application uses `jsPDF` and `electron-merge-pdf` to create PDFs of all the documentation that an organization's budget needs. The app implements a custom pdfGenerator that specifies styling for the PDF itself. These styles are all configurable and can be found as constants at the top of the generator file
