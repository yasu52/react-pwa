import firebase from "firebase";
import { db } from "./firebase"

export const initGet = async(uid) => {
    const todo = await db.collection("todo")
    .orderBy("createdAt", "desc")
    .where("uid", "==", uid);

    return todo.get().then((snapShot) => {
        let todos = [];
        snapShot.forEach((doc) => {
            todos.push({
                id: doc.id,
                content: doc.data().content,
                isComplete: doc.data().isComplete,
            });
        });
        return todos
    });
}

export const addTodo = (content, uid) => {
    db.collection("todo").add({
        content: content,
        uid: uid,
        isComplete: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

export const todoDelete = (id) => {
    db.collection("todo").doc(id).delete();
}

export const toggleComplete = async( id ) => {
    const todo = await db.collection("todo").doc(id).get();
    return db.collection("todo").doc(id).update({
        // もしチェックされたTodoが未完了 → isCompleteをtrue
        // もしチェックされたTodoが完了 → isCompleteをfalse
        isComplete: todo.data().isComplete ? false : true,
    });
}


export const getUserTitle = async (uid) => {
    const titleRef = db.collection("title").doc(uid);
    const doc = await titleRef.get();
    if (doc.exists) {
        return doc.data().title; // タイトルが存在する場合はその値を返す
    } else {
        return ""; // タイトルが存在しない場合は空文字を返す
    }
};

export const updateUserTitle = (uid, newTitle) => {
    return db.collection("title").doc(uid).set({
        title: newTitle
    }, { merge: true });
};
