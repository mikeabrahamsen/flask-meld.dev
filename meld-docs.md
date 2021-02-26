# Introduction:
Meld is a full-stack, reactive, Flask web framework. The DOM automatically 
updates as a user interacts with the page.

Instead of syncing data between the client and the server via HTTP requests,
Meld uses a persistent WebSocket connection. When data is updated on the
client, the data is sent to the server where the Component renders the new HTML
and sends it back to the client. 

The page HTML is written using Jinja templates, just as you would with Flask. 
Meld utilizes Morphdom to intelligently update the DOM so only elements on
the page that have been changed will be updated. This gives a fast, smooth,
reactive experience for the user with server-side rendered templates.

# Installation:
Install Flask-Meld in your virtual environment with `pip install flask-meld`

Meld uses the [Application Factory](https://flask.palletsprojects.com/en/master/tutorial/factory/) 
approach to structuring an application and gives the user some commands to get
their project setup quickly by automatting much of the boilerplate code for
you.

### Creating a new project with Meld

### Adding Meld to an existing project
Meld can be added to an existing application by completing the following steps:

- Import Meld into your application with `from flask_meld import Meld`
- Initialize the Meld extension. 
    - If you are using the Application Factory pattern, this means adding 
    `meld = Meld()` and `meld.init_app(app)` in your `__init__.py` file.
    - If using a single `app.py` instead of using the `init_app` you can simply
      initialize Meld by using `Meld(app)
- Use the socketio server to serve your application with `socketio.run(app)` or to 
specify a port and debugging use `socketio.run(app=app, port=5000, debug=True)`

# Components

Components consist of a Python class and a Jinja template that together, enable
you to create dynamic content without the need to write JavaScript.

The best way to start to understand how components work is to look at an example.

```py
# app/meld/components/counter.py

from flask_meld.component import Component


class Counter(Component):
    count = 0

    def add(self):
        self.count = int(self.count) + 1

    def subtract(self):
        self.count = int(self.count) - 1

```
The class above creates a property named `count` and defines the `add` and
`subtract` functions which will modify the `count` property.  Combining the use of 
properties and functions in this way allows you to customize the behavior of your components.


```html
<!-- templates/meld/counter.html -->
<div>
    <button meld:click="subtract">-</button>
    <input type="text" meld:model="count" readonly></input>
    <button meld:click="add">+</button>
</div>
```

The template includes two buttons and an input field. The buttons bind to the functions
using `meld:click="add"` and `meld:click:"subtract"` while the input binds to the
`count` property with `meld:model="count"`. 

Let's dive more in depth into properties and functions and how they are used to build
custom behavior into components.

# Properties

Components store model data for the class using `properties`. 

```
class Counter(Component):
    count = 0
```

This `Counter` component has a `count` property that can be updated.

