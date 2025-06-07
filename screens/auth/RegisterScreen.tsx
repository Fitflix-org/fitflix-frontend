import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigation = useNavigation();
  const { signup } = useAuth();

  const validateForm = () => {
    if (!name) {
      setError('Please enter your name');
      return false;
    }
    if (!email) {
      setError('Please enter your email');
      return false;
    }
    if (!phone) {
      setError('Please enter your phone number');
      return false;
    }
    if (!password) {
      setError('Please enter a password');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!gender) {
      setError('Please select your gender');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      setError('');
      
      await signup({
        name,
        email,
        phone: `+91${phone}`,
        password,
        gender,
        referralCode: referralCode || undefined
      });
      
      // Navigation will be handled by the auth hook
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/icon.png')}
            style={styles.logo}
          />
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setError('');
              }}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="envelope" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="phone" size={20} color="#666" style={styles.inputIcon} />
            <View style={styles.phoneInnerContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Phone Number"
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  setError('');
                }}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError('');
              }}
              secureTextEntry
            />
          </View>
          
          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setError('');
              }}
              secureTextEntry
            />
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

          <TouchableOpacity 
            style={[styles.signupButton, isLoading && styles.disabledButton]} 
            onPress={handleSignup}
            disabled={isLoading}
          >
            <Text style={styles.signupButtonText}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.termsText}>
            By clicking Sign Up, you agree to our <Text style={styles.linkText}>Terms of Service</Text>
            {' '}and <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account? 
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.signInLink}> Sign in</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
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
    marginBottom: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
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
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  linkText: {
    color: '#000',
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInLink: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});