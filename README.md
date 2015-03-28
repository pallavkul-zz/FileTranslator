# FileTranslator

Brief Description about this Node Project:
This project is intended to simplify language translation for structured files eg. HTML and XML. For now, the code if for HTML file.
It takes input as File and as of now I have hardcoded the language to "es" spanish(check main.js). You can very well change this locale.
Those node which are to be translated are referred via CSS class name "replaceble", this project parse the file and takes out all the replaceble 
nodes and translate them and replace the text on the original node and create a new file "output.html" after these translation changes. 

How to Setup/Run this project:
- Take the source code in to your local repository.
- You can remove "output.html"
- Make sure you have nodejs installed on your machine if not do it.
- Install all the node packages listed in package.json
- You are done with your setup.
- Run command "node main.js"  
- You will see a "output.html" file created in the same repository. That's your translated file in the desired language.


