import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { styles } from './styles';
import { formatDateInput, toDDMMYYYY, toDateFromDDMMYYYY } from '../../utils/date';
import { useProfileStore } from '../../store/useProfileStore';
import { usePermissionStore } from '../../store/usePermissionStore';
import { isGranted } from '../../services/permissionService';
import { CalendarIcon, DatePickerModal } from '../../components/common';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { readSmsAndIngest } from '../../services/smsService';
import { useAppStore } from '../../store/useAppStore';
import { db } from '../../db/database';
import { syncGmailTransactions } from '../../services/gmail/gmailIngestService';
import { ENV } from '../../config/env';

const imgArjun = require('../../assets/images/profile/arjun.png');
const imgEdit = require('../../assets/images/profile/edit.png');
const imgTier = require('../../assets/images/profile/tier.png');
const imgPermissions = require('../../assets/images/profile/permissions.png');
const imgConnect = require('../../assets/images/profile/connect.png');
const imgGoogle = require('../../assets/images/profile/google.png');
const imgSms = require('../../assets/images/profile/sms.png');

const defaultProfile = {
  name: 'Arjun Mehta',
  email: 'arjun.mehta@quantum-finance.io',
  phone: '+91 98765 43210',
  city: 'Mumbai',
  avatarUri: undefined,
  dob: '12/08/1994',
};

const ProfileScreen = () => {
  const { profile, updateProfile, resetProfile } = useProfileStore();
  const { status, requestAll } = usePermissionStore();
  const { loadTransactions } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [showPicker, setShowPicker] = useState(false);
  const [gmailSyncing, setGmailSyncing] = useState(false);
  const [gmailLastSync, setGmailLastSync] = useState<string | null>(null);

  const startEdit = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const saveEdit = () => {
    updateProfile(draft);
    setIsEditing(false);
  };

  const avatarSource = draft.avatarUri ? { uri: draft.avatarUri } : imgArjun;

  const handleDeleteAllData = () => {
    Alert.alert(
      'Delete all data?',
      'This will permanently remove all transactions, insights, and recurring patterns from this device. Your profile will be reset to default values. System permissions remain unchanged.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await db.executeAsync('DELETE FROM transactions');
            await db.executeAsync('DELETE FROM insights');
            await db.executeAsync('DELETE FROM recurring_patterns');
            await db.executeAsync('DELETE FROM rules');
            resetProfile();
            setDraft(defaultProfile);
            await loadTransactions();
          },
        },
      ]
    );
  };

  const handleManageLocalStorage = () => {
    Alert.alert(
      'Local storage',
      'This will let you review on-device data size, clear cached files, and manage retention. We will wire this in a later phase.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.glowLeft} />
        <View style={styles.glowRight} />
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileHero}>
            <View style={styles.avatarRing}>
              <View style={styles.avatarInner}>
                <Image source={avatarSource} style={styles.avatarImage} />
              </View>
              <View style={styles.avatarStatus} />
            </View>
            <Text style={styles.profileName}>{profile.name}</Text>
            <View style={styles.profileEmailRow}>
              <Text style={styles.profileEmail}>{profile.email}</Text>
              <View style={styles.profileDot} />
            </View>
            <Pressable style={styles.editButton} onPress={startEdit}>
              <Image source={imgEdit} style={styles.editIcon} />
              <Text style={styles.editText}>EDIT PROFILE</Text>
            </Pressable>
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              <View style={styles.field}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  value={draft.name}
                  onChangeText={(value) => setDraft({ ...draft, name: value })}
                  style={styles.input}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={draft.email}
                  onChangeText={(value) => setDraft({ ...draft, email: value })}
                  style={styles.input}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  value={draft.phone}
                  onChangeText={(value) => setDraft({ ...draft, phone: value })}
                  keyboardType="phone-pad"
                  style={styles.input}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  value={draft.city}
                  onChangeText={(value) => setDraft({ ...draft, city: value })}
                  style={styles.input}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Profile Image</Text>
                <View style={styles.imageActions}>
                  <Pressable
                    style={styles.imageButton}
                    onPress={async () => {
                      const result = await launchCamera({ mediaType: 'photo' });
                      const uri = result.assets?.[0]?.uri;
                      if (uri) setDraft({ ...draft, avatarUri: uri });
                    }}
                  >
                    <Text style={styles.imageButtonText}>Camera</Text>
                  </Pressable>
                  <Pressable
                    style={styles.imageButton}
                    onPress={async () => {
                      const result = await launchImageLibrary({ mediaType: 'photo' });
                      const uri = result.assets?.[0]?.uri;
                      if (uri) setDraft({ ...draft, avatarUri: uri });
                    }}
                  >
                    <Text style={styles.imageButtonText}>Gallery</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>DOB (DD/MM/YYYY)</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    value={draft.dob ?? ''}
                    onChangeText={(value) =>
                      setDraft({ ...draft, dob: formatDateInput(value) })
                    }
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor="#7C8399"
                    keyboardType="number-pad"
                    maxLength={10}
                    style={[styles.input, { flex: 1 }]}
                  />
                  <Pressable style={styles.calendarButton} onPress={() => setShowPicker(true)}>
                    <CalendarIcon />
                  </Pressable>
                </View>
              </View>
              <View style={styles.formActions}>
                <Pressable style={[styles.formButton, styles.cancelButton]} onPress={cancelEdit}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
                <Pressable style={[styles.formButton, styles.saveButton]} onPress={saveEdit}>
                  <Text style={styles.saveText}>Save</Text>
                </Pressable>
              </View>
            </View>
          ) : null}

          <View style={styles.subscriptionCard}>
            <View style={styles.subscriptionGlow} />
            <View style={styles.tierRow}>
              <Image source={imgTier} style={styles.tierIcon} />
              <Text style={styles.tierText}>TIER: FREE CLOUD</Text>
            </View>
            <Text style={styles.subscriptionHeading}>Unlock AI-powered wealth forecasting.</Text>
            <Text style={styles.subscriptionBody}>
              Get real-time SMS parsing, deep Gmail fiscal auditing, and unlimited
              vault storage.
            </Text>
            <View style={styles.subscriptionFooter}>
              <View style={styles.upgradeButton}>
                <Text style={styles.upgradeText}>UPGRADE{`\n`}TO{`\n`}PREMIUM</Text>
              </View>
              <View style={styles.pricingBlock}>
                <Text style={styles.priceOld}>₹999</Text>
                <Text style={styles.priceNew}>₹499/mo</Text>
              </View>
            </View>
          </View>

          <View style={styles.permissionsCard}>
            <View style={styles.permissionsHeader}>
              <Image source={imgPermissions} style={styles.permissionsIcon} />
              <Text style={styles.permissionsTitle}>System Permissions</Text>
            </View>
            <View style={styles.permissionRow}>
              <View>
                <Text style={styles.permissionLabel}>Camera Access</Text>
                <Text style={styles.permissionCaption}>Profile photo capture</Text>
              </View>
              <View style={isGranted(status.camera) ? styles.toggleOn : styles.toggleOff}>
                <View style={isGranted(status.camera) ? styles.toggleKnobRight : styles.toggleKnobLeft} />
              </View>
            </View>
            <View style={styles.permissionRow}>
              <View>
                <Text style={styles.permissionLabel}>Photo Library</Text>
                <Text style={styles.permissionCaption}>Choose profile image</Text>
              </View>
              <View style={isGranted(status.photo) ? styles.toggleOn : styles.toggleOff}>
                <View style={isGranted(status.photo) ? styles.toggleKnobRight : styles.toggleKnobLeft} />
              </View>
            </View>
            <View style={styles.permissionRow}>
              <View>
                <Text style={styles.permissionLabel}>SMS Access</Text>
                <Text style={styles.permissionCaption}>Read transaction alerts</Text>
              </View>
              <View style={isGranted(status.sms) ? styles.toggleOn : styles.toggleOff}>
                <View style={isGranted(status.sms) ? styles.toggleKnobRight : styles.toggleKnobLeft} />
              </View>
            </View>
            <View style={styles.permissionRow}>
              <View>
                <Text style={styles.permissionLabel}>Notifications</Text>
                <Text style={styles.permissionCaption}>Insight alerts</Text>
              </View>
              <View style={isGranted(status.notifications) ? styles.toggleOn : styles.toggleOff}>
                <View style={isGranted(status.notifications) ? styles.toggleKnobRight : styles.toggleKnobLeft} />
              </View>
            </View>
            <Pressable style={styles.primaryAction} onPress={requestAll}>
              <Text style={styles.primaryActionText}>Recheck Permissions</Text>
            </Pressable>
          </View>

          <View style={styles.dataSourcesCard}>
            <View style={styles.dataSourcesHeader}>
              <Text style={styles.dataSourcesTitle}>Data Feed{`\n`}Sources</Text>
              <Pressable
                style={styles.connectButton}
                onPress={() => Linking.openURL(ENV.GMAIL_AUTH_URL)}
              >
                <Image source={imgConnect} style={styles.connectIcon} />
                <Text style={styles.connectText}>CONNECT{`\n`}NEW</Text>
              </Pressable>
            </View>
            <View style={styles.sourceCard}>
              <View style={styles.sourceInfo}>
                <View style={styles.sourceIconWrap}>
                  <Image source={imgGoogle} style={styles.sourceIcon} />
                </View>
                <View>
                  <Text style={styles.sourceTitle}>Google{`\n`}Workspace</Text>
                  <Text style={styles.sourceMeta}>
                    Last sync:{` `}
                    {gmailLastSync ?? 'Not connected'}
                  </Text>
                </View>
              </View>
              <Pressable
                style={styles.syncPill}
                disabled={gmailSyncing}
                onPress={async () => {
                  setGmailSyncing(true);
                  try {
                    await syncGmailTransactions();
                    await loadTransactions();
                    setGmailLastSync('Just now');
                  } catch (error: any) {
                    Alert.alert('Gmail sync failed', error?.message ?? 'Try again.');
                  } finally {
                    setGmailSyncing(false);
                  }
                }}
              >
                <Text style={styles.syncText}>
                  {gmailSyncing ? 'SYNCING' : 'SYNC'}
                </Text>
              </Pressable>
            </View>
            <View style={styles.sourceCard}>
              <View style={styles.sourceInfo}>
                <View style={styles.sourceIconWrap}>
                  <Image source={imgSms} style={styles.sourceIcon} />
                </View>
                <View>
                  <Text style={styles.sourceTitle}>SMS{`\n`}Telemetry</Text>
                  <Text style={styles.sourceMeta}>Processing 424{`\n`}threads</Text>
                </View>
              </View>
              {isGranted(status.sms) ? (
                <Pressable
                  style={styles.syncPill}
                  onPress={async () => {
                    await readSmsAndIngest(50);
                    await loadTransactions();
                  }}
                >
                  <Text style={styles.syncText}>SYNC</Text>
                </Pressable>
              ) : (
                <View style={styles.analyzingPill}>
                  <View style={styles.analyzingDot} />
                  <Text style={styles.analyzingText}>PENDING</Text>
                </View>
              )}
            </View>
            <Pressable
              style={[
                styles.primaryAction,
                (Platform.OS !== 'android' || !isGranted(status.sms)) && styles.disabledAction,
              ]}
              onPress={async () => {
                if (Platform.OS !== 'android' || !isGranted(status.sms)) return;
                await readSmsAndIngest(100);
                await loadTransactions();
              }}
            >
              <Text style={styles.primaryActionText}>Sync SMS Now</Text>
            </Pressable>
          </View>

          <View style={styles.privacyCard}>
            <Text style={styles.privacyTitle}>Data Sovereignty</Text>
            <Text style={styles.privacyBody}>
              Manage how your fiscal intelligence is stored and retained. Locally
              encrypted.
            </Text>
            <View style={styles.privacyActions}>
              <Pressable style={styles.primaryAction} onPress={handleManageLocalStorage}>
                <Text style={styles.primaryActionText}>Manage Local Storage</Text>
              </Pressable>
              <Pressable style={styles.dangerAction} onPress={handleDeleteAllData}>
                <Text style={styles.dangerActionText}>Delete All Data</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <DatePickerModal
          visible={showPicker}
          value={toDateFromDDMMYYYY(draft.dob ?? '') ?? new Date()}
          onClose={() => setShowPicker(false)}
          onSelect={(selected) => setDraft({ ...draft, dob: toDDMMYYYY(selected) })}
          maximumDate={new Date()}
        />

      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
