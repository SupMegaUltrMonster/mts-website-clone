// Firebase Service Module (CDN version)
// Uses global Firebase objects from CDN scripts

const { initializeApp } = firebase.app;
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } = firebase.auth;
const { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, orderBy } = firebase.firestore;

let app, auth, db;

window.firebaseService = {
    init: async function(config) {
        try {
            app = initializeApp(config);
            auth = getAuth(app);
            db = getFirestore(app);
            
            console.log('✅ Firebase initialized successfully');
            
            // Listen for auth state changes
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log('User logged in:', user.email);
                    document.dispatchEvent(new CustomEvent('userLoggedIn', { detail: user }));
                } else {
                    console.log('User logged out');
                    document.dispatchEvent(new CustomEvent('userLoggedOut'));
                }
            });
            
            return { auth, db };
        } catch (error) {
            console.error('Firebase initialization error:', error);
            throw error;
        }
    },

    registerWithEmail: async function(email, password, name, phone) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: email,
                displayName: name,
                phone: phone,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isActive: true
            });
            
            return { success: true, user };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: this.getAuthErrorMessage(error.code) };
        }
    },

    loginWithEmail: async function(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: this.getAuthErrorMessage(error.code) };
        }
    },

    logout: async function() {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, message: error.message };
        }
    },

    loginWithGoogle: async function() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName || '',
                    photoURL: user.photoURL || '',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    isActive: true
                });
            }
            
            return { success: true, user };
        } catch (error) {
            console.error('Google login error:', error);
            return { success: false, message: error.message };
        }
    },

    getUserData: async function(uid) {
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { success: true, data: docSnap.data() };
            }
            return { success: false, message: 'User not found' };
        } catch (error) {
            console.error('Get user data error:', error);
            return { success: false, message: error.message };
        }
    },

    updateUserData: async function(uid, data) {
        try {
            await updateDoc(doc(db, 'users', uid), {
                ...data,
                updatedAt: new Date().toISOString()
            });
            return { success: true };
        } catch (error) {
            console.error('Update user data error:', error);
            return { success: false, message: error.message };
        }
    },

    createESimOrder: async function(orderData) {
        try {
            const userId = auth.currentUser?.uid;
            if (!userId) {
                return { success: false, message: 'Пользователь не авторизован' };
            }
            
            const order = {
                userId: userId,
                status: 'pending',
                plan: orderData.plan,
                phone: orderData.phone,
                qrCodeGenerated: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            const docRef = await addDoc(collection(db, 'esimOrders'), order);
            return { success: true, orderId: docRef.id, data: order };
        } catch (error) {
            console.error('Create eSIM order error:', error);
            return { success: false, message: error.message };
        }
    },

    getUserOrders: async function(userId) {
        try {
            const q = query(
                collection(db, 'esimOrders'),
                where('userId', '==', userId),
                orderBy('createdAt', 'desc')
            );
            
            const querySnapshot = await getDocs(q);
            const orders = [];
            querySnapshot.forEach((doc) => {
                orders.push({ id: doc.id, ...doc.data() });
            });
            
            return { success: true, orders };
        } catch (error) {
            console.error('Get orders error:', error);
            return { success: false, message: error.message };
        }
    },

    getAuthErrorMessage: function(code) {
        const messages = {
            'auth/email-already-in-use': 'Этот email уже зарегистрирован',
            'auth/invalid-email': 'Неверный формат email',
            'auth/weak-password': 'Пароль должен содержать минимум 6 символов',
            'auth/user-not-found': 'Пользователь не найден',
            'auth/wrong-password': 'Неверный пароль',
            'auth/too-many-requests': 'Слишком много попыток. Попробуйте позже',
            'auth/network-request-failed': 'Ошибка сети. Проверьте подключение',
            'auth/popup-closed-by-user': 'Окно авторизации закрыто',
            'auth/cancelled-popup-request': 'Авторизация отменена'
        };
        return messages[code] || 'Произошла ошибка. Попробуйте ещё раз';
    }
};
