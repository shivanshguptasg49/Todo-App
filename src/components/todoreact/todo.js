import React, {useState, useEffect} from 'react';
import "./style.css";

const getLocaldata = () => {
    const lists = localStorage.getItem("mytodolist");

    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
};
const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocaldata());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // add the items
    const addItem = () => {
        if(!inputdata){
            alert("Please fill the data");
        }
        else if(inputdata && toggleButton){
            setItems(
                items.map((currElem) => {
                    if(currElem.id == isEditItem){
                        return {...currElem, name:inputdata}
                    }
                    return currElem;
                })
            );
            setInputData([]);
            setIsEditItem("");
            setToggleButton(false);
        }
        else{
            const myNetInputData = {
                id:new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items, myNetInputData]);
            setInputData("");
        }
    };
    // edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((currElem) => {
            return currElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    };
    // how to delete items

    const deleteItem = (index) =>{
        const updatedItem = items.filter((curElem)=>{
            return curElem.id !== index;
        });
        setItems(updatedItem);
    };

    const removeAll = () => {
        setItems([]);
    }


    // adding local storage

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);
  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src="./images/todo.svg" alt="todologo" />
                <figcaption>Add your list here</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" 
                placeholder="✍️ Add item"
                className = "form-control"
                value={inputdata}
                onChange={(event) => setInputData(event.target.value)}
                />
                {toggleButton ? (<i className="far fa-edit" add-btn onClick={addItem}></i>) : 
                (<i className="fa fa-plus" add-btn onClick={addItem}></i>)}
            </div>
            {/* show our items */}
            <div className="showItems">
                {items.map((currElem, index) => {
                    return(
                        <div className="eachItem" key={currElem.id}>
                        <h3>{currElem.name}</h3>
                        <div className="todo-btn">
                        <i className="far fa-edit" add-btn onClick={() => editItem(currElem.id)}></i>
                        <i className="far fa-trash-alt" add-btn 
                        onClick={() => deleteItem(currElem.id)}></i>
                        </div>
                    </div>
                    );
                })}
                
            </div>
            <div className="showItems">
                <button className='btn effect04' data-sm-link-text = "Remove All" onClick={removeAll}>
                   <span>CHECK LIST</span> 
                </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo
