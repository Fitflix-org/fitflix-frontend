import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login with email:', email);
    // Navigate to home page after login
    router.push('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.logo}
        />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create your Account</Text>
        
        <TextInput
          style={styles.input}
          placeholder="email@domain.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        
        <Text style={styles.orText}>or</Text>
        
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/images/icon.png')} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/images/icon.png')} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
        
        <Text style={styles.termsText}>
          By clicking continue, you agree to our <Text style={styles.linkText}>Terms of Service</Text>
          {' '}and <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account ? <Link href="/auth/signup" style={styles.signInLink}>Sign in</Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  continueButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 15,
  },
  socialButton: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    marginBottom: 15,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#000',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#000',
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  signInLink: {
    color: '#000',
    fontWeight: 'bold',
  },
});