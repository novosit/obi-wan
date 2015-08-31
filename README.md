# Welcome Jedi Knight! #


We'll like for you to demonstrate your skills using the following tools:

- JavaScript, HTML5, CSS3
- C# (C Sharp) / F# (F Sharp),
- Node.js, CouchDB, RabbitMQ
- SQL Server
- TDD (any xUnit framework)

Here you have three programming challenges, you need to solve one using C# and the other using JavaScript. For the later (the one solved using JavaScript), you will create a plain old HTML+JavaScript+CSS application to, manually, test the solution. To serve that HTML GUI use anything from just the file system to a simple HTTP server.

If you choose to build any of the two programming problems as a HTML application, figure out the UI design.

Do use TDD for both challenges and include your tests in the final solution.

***How to deliver the solution?***
Just fork this repo and submit your solution as a pull request.

***Due date*** 
The last day to submit your solution is ***before Sep. 20, 2015***.

---
## What aspects will we evaluate about your solutions? ##
Be aware, some assessments are subjective, such as our beliefs about good software engineering practices.

- **Your solution must work:** Please do not submit solutions not doing what was asked.
- **.NET solutions:** Must run using only MSBuild tool, use .NET Framework 4.5 or any higher version. Use C# or F#.
- **JavaScript Solution:** Must run using the following command `node run.js`, will use node v12 or higher
- **OOP Principles:** We use Object Oriented technologies, we are looking for people with solid knowledge about OO principles. To name a few, we like you to know about:
  - S.O.L.I.D., 
  - Loosely coupled components, 
  - High cohesive components,
  - Encapsulation, polymorphism, and inheritance
- **Code Cleanness:** We love clean code. If you only care about *implementing what was asked*, and do not care a bit about *how it was implemented*, may this is not the place for you to work. 
  - Don't be confused ***we expect your code to work (do what was asked)***, but we will read your source code carefully to see how clean and well organized it is.
- **Maintainability:** Just to enforce the point, we need people able to produce code that can be read, and changed easily by anyone different from its original author.
- **Industry conventions**: You must follow all accepted industry conventions for the tool at hand:
  - Naming conventions for the language C# / JavaScript
  - File / class / method / variable declaration and organization
- **Automated tests:** Both solution must come with a suit of unit tests. Automated tests are not required for the HTML UI
- **Self-explained:** Your solutions must be organized in such a way that allows us to review it and test it without contacting you. If you need to do any clarification use the `README.md` file.

## What aspects will we evaluate about YOU? ##
If your code works, and we like it. We will make an appointment for an interview. You will be required to pass another set of technical and non-technical tests. Here we will list some, not all, aspects that we will be evaluating in that second round:

- **English level:** We need people able to read technical and non technical documentation in English. We also need people able to produce, at least, technical documentation / specifications in English. You need to be able to learn new things about your work using an English source. *We are not looking for a native speaker level, but if you already have that level of knowledge, your are welcome.*
- **Spanish level:** As with English, we expect you to be able to communicate effectively orally and written with your peers, clients and our executives. We do not want to have to oversee every communication you produce.
- **Team Player:** We use Agile, specifically Scrum and XP. We need you to be comfortable working as a team member. You will be required to talk and listen to others. We expect you to learn from others and teach others. We don't like the *us vs. them* mentality.
- **Self taught and eager to learn new things:** We can teach you a lot of things. Things related specifically to our product, software development skills and best practices, but with very frequently we face problems unknown for everyone on the team. In such situations we need you to seek and discover the solutions for yourself.


---
## Challenge One (under `.\01`): Quine–McCluskey's algorithm ##
### Description ###
You are challenged to implement Quine–McCluskey's algorithm. See: [Quine-MacCluskey @ Wikipedia](http://en.wikipedia.org/wiki/Quine%E2%80%93McCluskey_algorithm "Quine-MacCluskey @ Wikipedia"). You should be able to provide a interface that fulfills the following:

- `solveQuineMcCluskey (expression: string) : string`


Your function receives an expression of the form:

(example)
`A'BC'D'+AB'C'D'+AB'CD'+AB'CD+ABC'D'+ABCD`

***Bonus points:*** You get extra bonus points if your expression can take any form:

(example)
`AB(C+D')+A(B+D)`


***Returns:*** Your function returns an expanded expression that is minimized by Quine-McCluskey's Algoritm:
(example)
`BC'D'+AB'+AC`


***Notes:***

- Input and output strings contains no spaces.
- Variables are of the form [A-Z]. Assume no further than Z is allowed.

---
## Challenge Two (under `.\02`): Document Management (Design) ##
### Description ###
As a future ProDoctivity Development Team's member you are challenged to provide a design for the following feature:

Our product has the following concept:

- *Document:* Is a binary document of any type (Image (or images), Word Document, PDF, etc) and a set of keywords and records that are configured in the application's admin module. Documents also have status.
- *Status:* Published, InProgress, Deleted
- *Record:* Is a set of keyword and it's values. Records can also contains more records.
- *Keyword:* Is a definition of name, data type, and it's value (or values)
- *Data type:* Can be string, number, boolean, date or a predefined string list (eg: ["Active"; "Inactive"]

***New feature request:***

We need to allow the user to have the ability of "versioning" documents in the following way:

- New documents are the first in their version stream, so they don't belong to any other version.
- A documents can be a new version of another document.
- A change in a document's binary file is considered a whole new document's version
- A change in a document's keywords or records is also considered a whole new document's version
- A change in both is also a new document version
- If there is a binary without keywords and records, then the previous version's one are taken.
- If there is a set of keywords and records without a binary, then the previous version's one are taken.
- A document status change is also considered a new version.


***What we need from you:***

- Provide an architectural design of how would you implement this new feature in terms of:
	- Service definition. We need roughly the following:
		- A way to get the "Published" version of a document and fetch it.
		- A way to get the "Latest" version of a document and fetch it.
		- A way to pinpoint a specific version of a document and fetch it.
		- A way to get all different changes (or versions) of a given document
	- Web Endpoints (how the web app would communicate and expose your service and how external clients could use your service as an API)
	- Data structures
	- Data storage: (DB engines, data structure overview)
	- Components overview

***Take into account that:***

- We use a single-page web application and everything we do must be called into an http service

***What you need to provide:***

- You need to provide the design of such feature.
- You do not need to provide code
- You do not need to cover 100% of everything
- There is no need to be super-formal, after all this is a test and we know we are taking some of your time.
- Maximum 3 pages of a Word document
- You must describe your solution under using the **README.md** file under **`\.02`** directory. 

---
## Challenge Three (under `.\03`): Weekly Payments ##
Create a solution that can manage weekly payments for Company X. 

Company X can pay to its employees using one of three currencies: Dominican Peso (DOP), US Dollar (USD), and Euro (EUR). 

Company X is located in Dominican Republic, so its Base Currency is Dominican Peso (DOP).

The hours are paid at a fixed price of DOP $1,000.00

***Features Summary***

- Employee Data Capture
  - You need to capture employees details ( ID, Full name, and preferred currency), this is a one time data entry (see below 'I-Data Entry').
- Payment Report Generation
  - You need to capture the total hours for each employee (see below 'I-Data Entry').
  - You need to calculate the payment in both the Preferred Currency and the Base Currency.
      - Load employee data, and Week Worked Hours
      - Get the up-to-date exchange rates between the Base Currency (DOP) and the others two currencies (USD and EUR) (see below 'III-Exchange Rates')
      - Generate the Weekly Payments Report (see below 'II-Payments Report')
  - Output the Report to the Screen
  - Save the Report with a generated (incremental) Id (see bellow 'IV-Persistence').


***User Interface***

The application can be implemented as a Console Application or as Windows (Win32) Application. When you summit the solution please provide a description of the "Laucher" and how to use it.


***Features Details***

- **Data Entry:** 
  - Each employee can select his preferred currency. 
  - At the end of each week, employees must report the amount of worked hours.
  - The application can create the Payments Report only when all employees has reported their Worked Hours. Zero (worked hours) is a valid value.

- **Payments Report:**
  - The output must be a report (printed to the screen), or a file containing all payments. The report must have the following information (the final format is up to you):
      - Header: Full Date and Time, Total amount in the Base Currency, and Current Exchange Rates
      - Each entry: Entry number, Employee ID, Employee Full Name, Currency Code, Amount, Amount Base Currency$
      - Footer: Full Date and Time, Total amount in the Base Currency, Sub-Total by Currency

  Sample Report (assuming the Base Currency is DOP), USD to DOP is $30 DOP by $1 USD:

	  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	  Weekly Payment X-Company
	  2015-03-02 17:30:45 Total: DOP$14,000.00
	       Rates: Base DOP
	            To USR 0.0223
	            To EUR 0.0196
	
	  Entry     EmpID     Full Name      Currency         Amount    Base-Amount
	     1        001     Peter Parker   DOP           $5,000.00    $5,000.00
	     2        005     Mary Jane      USD             $300.00    $9,000.00
	
	  2015-03-02 17:30:45 Total: DOP$14,000.00
	       Total USD:   $300.00
	       Total DOP: $5,000.00
	  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


- **Exchange Rates:** Before you can produce the Payments Report, you need to know the exchange rates between the Base Currency (Dominican Peso - DOP) and the other currencies (USR, EUR). See below how to get that data.
  - Exchange Rates from Yahoo Finance API: The following URL (using GET), will bring you the exchange rates from DOP to USD and EUR: 

			http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("DOPEUR", "DOPUSD")&env=store://datatables.org/alltableswithkeys&format=json

  - The job (query), is done by the following URL parameter `select * from yahoo.finance.xchange where pair in ("DOPEUR", "DOPUSD")`

    Example: if you need the exchange rate between Mexican Peso and US Dollar you write the following query
`select * from yahoo.finance.xchange where pair in ("MXNUSD")`, the final URL will look like this

        http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("MXNUSD")&env=store://datatables.org/alltableswithkeys&format=json

    Sample Result

		{
		  query: {
		    count: 6,
		    created: "2015-03-03T15:24:30Z",
		    lang: "en-US",
		    results: {
		      rate: [
		        {
		          id: "DOPEUR",
		          Name: "DOP to EUR",
		          Rate: "0.02",
		          Date: "3/3/2015",
		          Time: "10:24am",
		          Ask: "0.02",
		          Bid: "0.0199"
		        },
		        {
		          id: "DOPUSD",
		          Name: "DOP to USD",
		          Rate: "0.0223",
		          Date: "3/3/2015",
		          Time: "10:23am",
		          Ask: "0.0224",
		          Bid: "0.0223"
		        }
		      ]
		    }
		  }
		}

  *The rate is read like this:* To convert from DOP to USD you must multiply the DOP amount by 0.0223 (Bid). If you have DOP$100.00 to get USD do: 100 x 0.0223 = USD$2.23


- **Persistence:**
  If you need to persist any data element (User details, Old Reports, etc), use in-memory repository with raw data as JSON.


---

![screenshot](./may-the-force-be-with-you.jpg)