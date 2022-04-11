const firebaseConfig = {
    apiKey: 'AIzaSyDcDMTn6D_u9p98Wqkb5D_LCw0ImZJpR0k',
    authDomain: 'aia-fyp.firebaseapp.com',
    projectId: 'aia-fyp',
    storageBucket: 'aia-fyp.appspot.com',
    messagingSenderId: '783807783782',
    appId: '1:783807783782:web:73da52db508dafb82b1ea7',
    measurementId: 'G-WGW26G905J'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

async function getArea() {
    db.collection('DangerousArea')
        .doc('Camera_1')
        .get()
        .then((doc) => {
            if (doc.exists) {
                console.log('Document data:', doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log('No such document!');
            }
        })
        .catch((error) => {
            console.log('Error getting document:', error);
        });
}

async function updateArea(polygon) {
    db.collection('DangerousArea')
        .doc('Camera_1')
        .update({
            area: polygon
        })
        .then(() => {
            console.log('Document successfully updated!');
            alert('Dangerous Area Successfully Updated!');
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error);
        });
}
