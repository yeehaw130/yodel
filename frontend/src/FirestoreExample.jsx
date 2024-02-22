// FirestoreExample.jsx
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firestore from './firebase';

function FirestoreExample() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(firestore);
        const collectionRef = collection(db, 'users');
        const snapshot = await getDocs(collectionRef);

        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(newData);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Firestore Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FirestoreExample;
