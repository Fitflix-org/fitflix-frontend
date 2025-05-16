import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login:', { phoneNumber });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
        />
        <Text style={styles.title}>India's Smartest Fitness App</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Login</Text>
        <View style={styles.phoneInput}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.messageButton}>
            <FontAwesome5 name="comment" size={20} color="#FF0000" />
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.whatsappButton}>
            <FontAwesome5 name="whatsapp" size={20} color="#fff" />
            <Text style={styles.whatsappButtonText}>Whatsapp</Text>
          </TouchableOpacity>
        </View>

        

        <View style={styles.signup}>
          <Text style={styles.signupText}>New Customer? </Text>
          <Link href="/auth/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
  },
  countryCode: {
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#666',
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF0000',
    gap: 10,
  },
  whatsappButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#25D366',
    gap: 10,
  },
  messageButtonText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  whatsappButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emailLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  emailLoginText: {
    color: '#666',
    fontSize: 16,
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
});