import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'react-native-haptic-feedback';
import {launchImageLibrary} from 'react-native-image-picker';

const ProfileScreen = () => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [bio, setBio] = useState('Passionate about technology & innovation.');

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 500,
      maxWidth: 500,
    });
    if (result.assets?.[0]?.uri) {
      setProfilePhoto(result.assets[0].uri);
      Haptics.trigger('impactLight');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <TouchableOpacity
        onPress={pickImage}
        style={styles.profilePhotoContainer}>
        {profilePhoto ? (
          <Image source={{uri: profilePhoto}} style={styles.profilePhoto} />
        ) : (
          <Icon name="account-circle" size={100} color="#bbb" />
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter your email"
        placeholderTextColor="#888"
      />
      <TextInput
        style={[styles.input, styles.bioInput]}
        value={bio}
        onChangeText={setBio}
        placeholder="Enter a short bio"
        placeholderTextColor="#888"
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  profilePhotoContainer: {
    marginBottom: 20,
    borderRadius: 75,
    overflow: 'hidden',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    color: '#fff',
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
});

export default ProfileScreen;
