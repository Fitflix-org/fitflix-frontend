import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleSignup = () => {
    // TODO: Implement signup logic
    console.log('Signup:', { name, email, phone, gender, referralCode });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
        />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Enter Email Or Phone And Experience The Fitness World.</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="user" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
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

        <View style={styles.phoneContainer}>
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

        <Text style={styles.label}>Select Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity 
            style={[styles.genderButton, gender === 'male' && styles.genderButtonActive]}
            onPress={() => setGender('male')}
          >
            <FontAwesome5 name="mars" size={20} color={gender === 'male' ? '#FF0000' : '#666'} />
            <Text style={[styles.genderText, gender === 'male' && styles.genderTextActive]}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.genderButton, gender === 'female' && styles.genderButtonActive]}
            onPress={() => setGender('female')}
          >
            <FontAwesome5 name="venus" size={20} color={gender === 'female' ? '#FF0000' : '#666'} />
            <Text style={[styles.genderText, gender === 'female' && styles.genderTextActive]}>Female</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.genderButton, gender === 'other' && styles.genderButtonActive]}
            onPress={() => setGender('other')}
          >
            <FontAwesome5 name="transgender" size={20} color={gender === 'other' ? '#FF0000' : '#666'} />
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

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.login}>
          <Text style={styles.loginText}>Already have account? </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

import { Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
  },
  countryCode: {
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#666',
  },
  phoneInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    gap: 10,
  },
  genderButtonActive: {
    backgroundColor: '#FFE5E5',
  },
  genderText: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
  },
  genderTextActive: {
    color: '#FF0000',
  },
  signupButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  login: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
});