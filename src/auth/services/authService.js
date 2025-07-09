import Parse from 'parse';

class AuthService {
  // Initialize Parse if not already done
  static initializeParse() {
    if (!Parse.applicationId) {
      Parse.initialize(
        process.env.REACT_APP_PARSE_APP_ID || 'your-app-id',
        process.env.REACT_APP_PARSE_JAVASCRIPT_KEY || 'your-js-key'
      );
      Parse.serverURL = process.env.REACT_APP_PARSE_SERVER_URL || 'https://parseapi.back4app.com/';
    }
  }

  // Register a new user
  static async register(username, email, password) {
    try {
      this.initializeParse();
      
      const user = new Parse.User();
      user.set('username', username);
      user.set('email', email);
      user.set('password', password);

      const newUser = await user.signUp();
      
      // Store user info in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        username: newUser.get('username'),
        email: newUser.get('email'),
        sessionToken: newUser.getSessionToken()
      }));

      return {
        success: true,
        user: {
          id: newUser.id,
          username: newUser.get('username'),
          email: newUser.get('email')
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Login user
  static async login(username, password) {
    try {
      this.initializeParse();
      
      const user = await Parse.User.logIn(username, password);
      
      // Store user info in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        username: user.get('username'),
        email: user.get('email'),
        sessionToken: user.getSessionToken()
      }));

      return {
        success: true,
        user: {
          id: user.id,
          username: user.get('username'),
          email: user.get('email')
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Logout user
  static async logout() {
    try {
      await Parse.User.logOut();
      localStorage.removeItem('currentUser');
      return { success: true };
    } catch (error) {
      // Even if Parse logout fails, clear local storage
      localStorage.removeItem('currentUser');
      return { success: true };
    }
  }

  // Check if user is authenticated
  static isAuthenticated() {
    const currentUser = Parse.User.current();
    const localUser = localStorage.getItem('currentUser');
    return !!(currentUser || localUser);
  }

  // Get current user
  static getCurrentUser() {
    const currentUser = Parse.User.current();
    if (currentUser) {
      return {
        id: currentUser.id,
        username: currentUser.get('username'),
        email: currentUser.get('email')
      };
    }

    // Fallback to localStorage
    const localUser = localStorage.getItem('currentUser');
    if (localUser) {
      const userData = JSON.parse(localUser);
      return {
        id: userData.id,
        username: userData.username,
        email: userData.email
      };
    }

    return null;
  }

  // Restore session from localStorage
  static async restoreSession() {
    try {
      const localUser = localStorage.getItem('currentUser');
      if (localUser) {
        const userData = JSON.parse(localUser);
        if (userData.sessionToken) {
          this.initializeParse();
          await Parse.User.become(userData.sessionToken);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Failed to restore session:', error);
      localStorage.removeItem('currentUser');
      return false;
    }
  }
}

export default AuthService;
