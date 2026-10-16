// Firebase Service Module
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, orderBy } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

let app, auth, db;

export async function initFirebase(config) {
  try {
    app = initializeApp(config);
    auth = getAuth(app);
    db = getFirestore(app);
    
    console.log('Firebase initialized successfully');
    
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
}

// Authentication
export async function registerWithEmail(email, password, name, phone) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save user data to Firestore
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
    return { success: false, message: getAuthErrorMessage(error.code) };
  }
}

export async function loginWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: getAuthErrorMessage(error.code) };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, message: error.message };
  }
}

export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      // Create new user document
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
}

// User Data
export async function getUserData(uid) {
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
}

export async function updateUserData(uid, data) {
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
}

// eSIM Orders
export async function createESimOrder(orderData) {
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
}

export async function getUserOrders(userId) {
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
}

// Helper: Get user-friendly error messages
function getAuthErrorMessage(code) {
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
