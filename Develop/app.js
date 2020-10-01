const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = [];











// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// prompting the user to gather information about the manager and team members (inquirer)
// starting with the manager prompt
managerPrompt();
function managerPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What's your Manager's name?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What's your Manager's ID number?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What's your Manager's email address?",
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What's your Manager's office number?",
      },
      {
        type: "list",
        name: "teamMember",
        message: "Which team member(s) would you like to add?",
        choices: ["Engineer", "Intern"],
      },
    ])
    .then(function (response) {
      const newManager = new Manager(
        response.managerName,
        response.managerId,
        response.managerEmail,
        response.managerOfficeNumber
      );
      employeeArray.push(newManager);
        // using conditionals to select the first team member 
      if (response.teamMember === "Engineer") {
        console.log("selected an Engineer!");
        engineerPrompt();
      } else if (response.teamMember === "Intern") {
        console.log("Selected an Intern!");
        internPrompt();
      }
    })
    .catch((error) => {
      if (error) throw error;
    });
}
// this holds the engineer prompt 
function engineerPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What's your Engineer's name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What's your Engineer's ID number?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What's your Engineer's email address?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What's your Engineer's GitHub username?",
      },
    ])
    .then(function (response) {
      console.log(response);
      const newEngineer = new Engineer(
        response.engineerName,
        response.engineerId,
        response.engineerEmail,
        response.engineerGithub
      );
      employeeArray.push(newEngineer);
      stopPrompt();
    })
    .catch((error) => {
      if (error) throw error;
    });
}
// this holds the intern prompt
function internPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What's your Intern's name?",
      },
      {
        type: "input",
        name: "internId",
        message: "What's your Intern's ID number?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What's your Intern's email address?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What school does your Intern attend?",
      },
    ])
    .then(function (response) {
      console.log(response);
      const newIntern = new Intern(
        response.internName,
        response.internId,
        response.internEmail,
        response.internSchool
      );
      employeeArray.push(newIntern);
      stopPrompt();
    })
    .catch((error) => {
      if (error) throw error;
    });
}
// the is the add member function that asks the user after the second member selection
function addMemberPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "teamMember",
      message: "Which team member(s) would you like to add?",
      choices: ["Engineer", "Intern"],
    })
    .then(function (response) {
      if (response.teamMember === "Engineer") {
        console.log("You picked another Engineer");
        engineerPrompt();
      } else if (response.teamMember === "Intern") {
        console.log("You picked another Intern");
        internPrompt();
      }
    })
    .catch(function (err) {
      if (err) throw err;
    });
}

// the stop function will ask the user if he or she wishes to continue building the team or is done
// when true - user is taken to the add member prompt
// when false - input is stored and html file is created through the render function
function stopPrompt() {
  inquirer
    .prompt({
      type: "confirm",
      name: "stop",
      message: "Would you like to add another team member?",
    })
    .then(function (result) {
      console.log(result);
      if (result.stop === true) {
        addMemberPrompt();
      } else {
        console.log("We're done here pal");
        console.log(employeeArray);
        render(employeeArray);
        let returnedHTML = render(employeeArray);
        console.log(returnedHTML);

        fs.writeFile(outputPath, returnedHTML, function (err) {
          if (err) throw err;
          console.log("Your new file has been created!");
        });
      }
    })
    .catch(function (err) {
      if (err) throw err;
    });
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
