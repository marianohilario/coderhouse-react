import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, addDoc, query, where, collection, getDocs, Timestamp  } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDgSXYynnubNkpQJlGKj3o07K5aipNU8Gc",
  authDomain: "habemus-f2bf1.firebaseapp.com",
  projectId: "habemus-f2bf1",
  storageBucket: "habemus-f2bf1.appspot.com",
  messagingSenderId: "674441887878",
  appId: "1:674441887878:web:6861a1bac8f54a899a5107"
};


const app = initializeApp(firebaseConfig);
const fireStoreDb = getFirestore(app);

export default fireStoreDb;

// Obtengo todos los items de la DB

export async function getAllItems() {
    const miColec = collection(fireStoreDb,'items');
    const itemsSnapshot = await getDocs(miColec);

    return itemsSnapshot.docs.map(doc => {
        return {
        ...doc.data(),
        id: doc.id
        }
})};

export async function getItemsByCategory(categoryid){
    const miColec = collection(fireStoreDb,'items');
    const queryItem = query(miColec, where("category", '==', categoryid));
    const itemSnapshot = await getDocs(queryItem);

    return itemSnapshot.docs.map(doc => {
        return {
        ...doc.data(),
        id: doc.id
        }
    
})};

export async function getItem(id){
    const miColec = collection(fireStoreDb,'items');
    const itemRef = doc(miColec, id);
    const itemSnapshot = await getDoc(itemRef);

    
        return {
        ...itemSnapshot.data(),
        id: itemSnapshot.id
        }
    
};

export async function createBuyOrder(orderData){
    const buyTimeStamp = Timestamp.now();
    const orderWithDate = {
        ...orderData,
        date: buyTimeStamp
    };
    const miColec = collection(fireStoreDb,'buyOrders');
    const orderDoc = await addDoc(miColec, orderWithDate);
    console.log("Orden lista con el id ",orderDoc.id);
    console.log(orderData)
    return orderDoc.id;   
}