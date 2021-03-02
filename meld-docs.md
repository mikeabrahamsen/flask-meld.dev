# Introduction:
Meld is a full-stack, reactive, web framework built on Flask. Meld gives you tools to
dynamic frontend experiences without the need to write any Javascript.

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

# Building Applications With Meld

## Components

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

## Properties

Components store model data for the class using `properties`. 

```
class Counter(Component):
    count = 0
```

This `Counter` component has a `count` property that will be included in the template
context to be used. 

## Data Binding

You can bind a compenent property to an html element with `meld:model`. For instance,
you can easily update a property by binding it to an `input` element. When a user types
text in the input field, the property is automatically updated in the component.

```
class Person(Component):
    name = ""
---------------------------------------------
<div>
    <input meld:model="name" type="text">

    <h1>Hello {{ name }}</h1>
</div>
```

You can use `meld:model` on the following elements:

```
<input type="text">
<input type="radio">
<input type="checkbox">
<select>
<textarea>
```

## Modifiers

Use modifiers to change how Meld handles network requests.

`debounce`: `<input meld:model.debounce-500="search">` Delay network requests for an amount of time after a keypress. Used to increase performance and sync when the user has paused typing for an amount of time. `debounce-250` will wait 250ms before it syncs with the server. The default is 150ms.

`defer`: `<input meld:model.defer="search">` Pass the search field with the next network request. Used to improve performance when realtime databinding is not necessary.

`prevent`: Use to prevent a default action. The following example uses `defer` to delay sending a network request until the form is submitted. An idea of how this can be used: instead of adding a keydown event listener to the input field to capture the press of the `enter` key, a form with `meld:submit.prevent="search"` can be used to to invoke a component's `search` function instead of the default form handler on form submission.

```
<form meld:submit.prevent="search">
    <input meld:model.defer="search_text" type="text" name="name" id="name" placeholder="Search for name">
    <button meld:click="search">Search</button>

    <!-- To get the same functionality without using meld:submit.prevent="search" you
    would need to add an event listener for the enter key 
    <input meld:model.defer="search_text" meld:keydown.Enter="search" type="text" name="name" id="name" placeholder="Search for name">
    -->
</form>
```

## Form Validation

A big part of creating web applications is using forms. Flask-Meld integrates with
Flask-WTF to give you real-time form validation without writing any Javascript.

### Use WTForms for validation

Define your form with Flask-WTF

```py
# forms.py
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, EqualTo


class RegistrationForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    password_confirm = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
```

### Create your template

Use WTForm helpers to create your form in your HTML template. 

```html
<!-- templates/meld/register.html -->
<div>
    <form method="POST">
        <div>
            {{ form.email.label }}
            {{ form.email }}
            <span> {{ errors.password | first }} </span>
        </div>

        <div>
            {{ form.password.label }}
            {{ form.password }}
            <span> {{ errors.password | first }} </span>
        </div>
        <div>
            {{ form.password_confirm.label }}
            {{ form.password_confirm }}
            <span> {{ errors.password_confirm | first }} </span>
        </div>
        <div>
            {{ form.submit }}
        </div>
    </form>
</div>
```

Using the WTForm helpers saves you some typing. 
Alternatively, you can define your HTML form without using the helpers. 
For example, to make a field use
`<input id="email" meld:model="email" name="email" required="" type="text" value="">`
Make sure that `meld:model="name_of_field"` exists on each field.

### Define the form in the component

```py
# meld/components/register.py
from flask_meld import Component
from forms import RegistrationForm


class Register(Component):
    form = RegistrationForm()
```

### Realtime form validation

To make your form validate as a user types use the `updated` function. This will provide
the form field and allow you to validate on the fly. Simply call `validate` on the
field.

```py
# meld/components/register.py
from flask_meld import Component
from forms import RegistrationForm


class Register(Component):
    form = RegistrationForm()

    def updated(self, field):
        self.validate(field)
```

### Your routes can stay the same when using real-time validation

You can create a custom method on your component (such as a `save` method) to handle
submissions or you can use your regular old Flask routes. 

```py
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        # do anything you need with your form data...
        return redirect(url_for("index"))
    return render_template("register_page.html")
```
