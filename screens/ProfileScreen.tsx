import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'react-native-haptic-feedback';

const ProfileScreen = () => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [username] = useState('@CyberUser');
  const neonGlow = useSharedValue(1); // Initial glow intensity

  // Initialize the animation effect
  useEffect(() => {
    // Start a pulsating glow effect
    neonGlow.value = withRepeat(
      withTiming(1.5, {duration: 2000, easing: Easing.inOut(Easing.ease)}),
      -1,
      true,
    );

    // Cleanup animation on component unmount
    return () => {
      cancelAnimation(neonGlow);
    };
  }, [neonGlow]);

  // Pick an image from gallery
  const pickImage = async () => {
    try {
      // Request permissions first on iOS
      if (Platform.OS !== 'web') {
        const {status} =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          return;
        }
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfilePhoto(result.assets[0].uri);
        Haptics.trigger('impactLight'); // Add subtle haptic feedback
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  // Animated Glow Style
  const animatedGlow = useAnimatedStyle(() => ({
    transform: [{scale: neonGlow.value}],
    shadowOpacity: neonGlow.value - 0.8, // Adjust shadow dynamically
  }));

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Picture with Glow Effect */}
      <TouchableOpacity
        onPress={pickImage}
        style={styles.profilePhotoContainer}
        activeOpacity={0.8}>
        <Animated.View style={[styles.glowContainer, animatedGlow]}>
          <LinearGradient
            colors={['#00f5ff', '#0066ff']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradientGlow}>
            {profilePhoto ? (
              <Image source={{uri: profilePhoto}} style={styles.profilePhoto} />
            ) : (
              <View style={styles.iconContainer}>
                <Icon name="account-circle" size={120} color="#ffffff" />
              </View>
            )}
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>

      <Text style={styles.username}>{username}</Text>

      {/* User Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>42</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>128</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>356</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
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
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  profilePhotoContainer: {
    marginBottom: 20,
    borderRadius: 75,
    overflow: 'hidden',
  },
  glowContainer: {
    borderRadius: 75,
    padding: 5,
    shadowColor: '#00f5ff',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 20,
    elevation: 15,
  },
  gradientGlow: {
    padding: 5,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  username: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#00f5ff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
  },
  editButton: {
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00f5ff',
    marginTop: 20,
  },
  editButtonText: {
    color: '#00f5ff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
function alert(_arg0: string) {
  throw new Error('Function not implemented.');
}
