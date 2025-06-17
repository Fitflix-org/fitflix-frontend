import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../features/auth/auth-context';

export default function SignupScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const { router } = require('expo-router');
  const { signup, isLoading, error } = useAuth();

  const handleSignup = async () => {
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    // Validate password strength
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }
    
    try {
      // Call the signup function from auth context
      await signup({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone: phone.length > 0 ? phone : undefined
      });
      
      // Navigation is handled in the signup function after successful registration
    } catch (err) {
      console.error('Signup error:', err);
      // Error handling is done in the auth context
    }
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
        <Text style={styles.title}>Create Account</Text>
        
        <View style={styles.inputContainer}>
          <FontAwesome5 name="user" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <FontAwesome5 name="user" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome5 name="envelope" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="demo@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <FontAwesome5 name="lock" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome5 name="phone" size={20} color="#666" style={styles.inputIcon} />
          <View style={styles.phoneInnerContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="999999999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>

        <Text style={styles.label}>Select Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity 
            style={[styles.genderButton, gender === 'male' && styles.genderButtonActive]}
            onPress={() => setGender('male')}
          >
            <FontAwesome5 name="mars" size={20} color={gender === 'male' ? '#000' : '#666'} />
            <Text style={[styles.genderText, gender === 'male' && styles.genderTextActive]}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.genderButton, gender === 'female' && styles.genderButtonActive]}
            onPress={() => setGender('female')}
          >
            <FontAwesome5 name="venus" size={20} color={gender === 'female' ? '#000' : '#666'} />
            <Text style={[styles.genderText, gender === 'female' && styles.genderTextActive]}>Female</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.genderButton, gender === 'other' && styles.genderButtonActive]}
            onPress={() => setGender('other')}
          >
            <FontAwesome5 name="transgender" size={20} color={gender === 'other' ? '#000' : '#666'} />
            <Text style={[styles.genderText, gender === 'other' && styles.genderTextActive]}>Other</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome5 name="tag" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Referral Code (Optional)"
            value={referralCode}
            onChangeText={setReferralCode}
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <TouchableOpacity 
          style={[styles.continueButton, isLoading && styles.disabledButton]} 
          onPress={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.continueButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        
        <Text style={styles.termsText}>
          By clicking Sign Up, you agree to our <Text style={styles.linkText}>Terms of Service</Text>
          {' '}and <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account? <Link href="/auth/login" style={styles.signInLink}>Login</Link>
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
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  phoneInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
    width: '100%',
  },
  genderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 25,
    marginHorizontal: 5,
    gap: 10,
  },
  genderButtonActive: {
    backgroundColor: '#f5f5f5',
  },
  genderText: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
  },
  genderTextActive: {
    color: '#000',
  },
  continueButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#666',
    opacity: 0.7,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#000000',
  },
  signInLink: {
    color: '#000000',
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