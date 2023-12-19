import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api"
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig"
import { AuthContext } from "../providers/AuthProvider";
import ToDoList from "./ToDoList";

const useStyles = makeStyles(() => ({
    root: {
        textAlign: 'center',
        marginTop: 40,
    },
    form: {
        width: "100%",
        maxWidth: 360,
        margin: "auto",
        marginBottom: 40,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
    },
    input: {
        marginRight: 10,
        backgroundColor: '#f5f5f5', // 背景色
        '& .MuiInput-underline:after': { // フォーカス時のアンダーライン
            borderBottomColor: '#ffcce6', // フォーカス時のアンダーラインの色
        },
    },
    addButton: {
        backgroundColor: '#ff66b3', // Buttonの背景色
        color: 'white', // 文字色
        '&:hover': { // ホバー時のスタイル
            backgroundColor: '#ff66b3',
        },
    }
}));

const Dashboard = () => {
    const classes = useStyles();
    const currentUser =  useContext(AuthContext);
    const [inputName, setInputName] = useState("");
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    console.log(inputName);
    console.log(todos);

    useEffect(() => {
        // Todo一覧を取得
        fetch();
        fetchTitle();
    }, [currentUser])

    const fetchTitle = async () => {
        if (dig(currentUser, 'currentUser', 'uid')) {
            const userTitle = await Api.getUserTitle(currentUser.currentUser.uid);
            setTitle(userTitle);
        }
    };

    const updateTitle = async (newTitle) => {
        if (dig(currentUser, 'currentUser', 'uid')) {
            await Api.updateUserTitle(currentUser.currentUser.uid, newTitle);
            setTitle(newTitle);
            setIsEditing(false);
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const titleRender = () => {
        if (!dig(currentUser, 'currentUser', 'uid')) return null; // ログアウト状態では非表示

        return isEditing ? (
            <div>
            <TextField value={title} onChange={handleTitleChange} />
            <Button onClick={() => updateTitle(title)}>Save</Button>
        </div>
        ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ marginRight: '10px' }}>{title}</h2>
            <Button size="small" onClick={() => setIsEditing(true)}>Edit</Button>
        </div>
        );
    };

    const fetch = async() => {
        if ( dig(currentUser, 'currentUser', 'uid') ){
            const data = await Api.initGet(currentUser.currentUser.uid);
            await setTodos(data);
        }
    }

    const formRender = () => {
        let dom
        // もしログインしていたら、TODOの入力フォーム
        if( dig(currentUser, 'currentUser', 'uid') ){
            dom = <form className={classes.form}>
                <TextField placeholder="PlanName" className={classes.input} value={inputName} onChange={(event) => setInputName(event.currentTarget.value)}/>
                <Button variant="contained" className={classes.addButton} size="small" 
                disabled={inputName.length > 0 ? false : true}
                type="button" onClick={() => post()}>Add</Button>
            </form>
        }else{
            // dom = <button onClick={signInWithGoogle}>LOGIN</button>
        }
        return dom
    }

    const post = async() => {
        await Api.addTodo(inputName, currentUser.currentUser.uid)
        await setInputName("");
        fetch();
    }
    return(
        <div className={classes.root}>
            {titleRender()}
            {formRender()}
            <ToDoList todos={todos} fetch={fetch}/>
        </div>
    )
};
export default Dashboard;