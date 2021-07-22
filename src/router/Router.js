const fs = require("fs");
const { nanoid } = require('nanoid');

module.exports = (app) => {
    const filePath = './src/data/a.json';
    const _randomId = nanoid(10);

    // get todo
    app.get("/todo", (req, res) => {

        // get from file
        const todoObj = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(todoObj);
        data.message = "Todo fetched successfully!"
        res.json(data);
    });

    app.delete("/todo/:id", (req, res) => {
        const _id = req.params.id; // get id from parameters

        // access file
        const objectData = fs.readFileSync(filePath, "utf8");

        // convert to the object
        const myObj = JSON.parse(objectData);

        // check if the item exists in the array by id
        const selectedTodo = myObj.todos.find((item) => item.id === _id);

        // if exists delete 
        if (selectedTodo) {
            // exclude the selected item
            const afterRemovedTodos = myObj.todos.filter((item, index) => item.id !== _id);
            // set to the todos array with deleted item
            myObj.todos = afterRemovedTodos;

            // and update the file again
            fs.writeFile(filePath, JSON.stringify(myObj, null, 4), (err, data) => {
                if (err) throw err;

                res.json({
                    message: "Deleted Successfully!"
                })
            })
        } else {
            res.json({
                message: "This is doesn't exist. Please check the id"
            })
        }

    });

    // create todo
    app.post('/todo', (req, res) => {


        // getting todo from client
        const _newTodo = {
            id: _randomId,
            todo: req.body.todo
        }

        let objectData = { todos: _newTodo };

        fs.readFile(filePath, 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {

                console.log(' data ', data);
                // if file has data
                if (data) {
                    objectData = JSON.parse(data); //now it an object

                    objectData.todos.push(_newTodo); //add some data

                    const json = JSON.stringify(objectData, null, 4); //convert it back to json

                    fs.writeFile(filePath, json, 'utf8', (err, data) => {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            console.log('data added')
                            res.json({
                                data: _newTodo,
                                message: "Todo has been added successfully!!!"
                            });
                        }
                    });

                } else {

                    const json = JSON.stringify(objectData, null, 4);

                    fs.writeFile(filePath, json, 'utf8', (err, data) => {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            console.log('data added')
                            res.json({
                                data: _newTodo,
                                message: "Todo has been added successfully!!!"
                            });
                        }
                    });

                    res.json({
                        message: "No data"
                    })
                }


            }
        });

    });
}