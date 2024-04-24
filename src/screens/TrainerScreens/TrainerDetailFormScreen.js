import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import color from '../../assets/theme/color';
import LogoWithBackground from '../../components/LogoWithBackground';
import Headline from '../../components/text/Headline';
import Input3 from '../../components/inputs/Input3';
import CountryDropdown from '../../components/CountryDropdown';
import StateDropdown from '../../components/StateDropdown';
import CityDropdown from '../../components/CityDropdown';
import UniversityDropdown from '../../components/UniversityDropdown';
import GenderDropdown from '../../components/GenderDropdown';
import CategoryDropdown from '../../components/CategoryDropdown';
import VioletButton from '../../components/VioletButton';

export default function TrainerDetailFormScreen({navigation, route}) {
  // console.log('route', route);
  // const {select_type} = route.params;

  return (
    <View style={styles.page}>
      <LogoWithBackground />
      <ScrollView>
        <View style={{paddingHorizontal: 10}}>
          <Headline title={'INSTITUTE INFORMATION'} />
        </View>

        <View style={styles.pageConatiner}>
          <Input3 label="Institute Name" placeholder="Institute Name" />
          <View style={{marginVertical: 5}}>
            <CountryDropdown label={'Country'} />
          </View>
          <View style={{marginVertical: 5}}>
            <StateDropdown label={'State'} />
          </View>
          <View style={{marginVertical: 5}}>
            <CityDropdown label={'City'} />
          </View>
          <View style={{marginVertical: 5}}>
            <UniversityDropdown label={'University'} />
          </View>
          <View style={{marginVertical: 5}}>
            <Input3 label="University Name" placeholder="University Name" />
          </View>

          <View style={{paddingVertical: 10}}>
            <Headline title={'PROFESSIONAL INFORMATION'} />
          </View>
          <View style={{marginVertical: 5}}>
            <Input3 label="Total Experience" placeholder="Total Experience" />
          </View>
          <Input3
            multiline={true}
            numberOfLines={4}
            label="Current Occupation with descriptions"
            placeholder="(Example: Nus yr 4 Mech Engineering or Working, Account Executive)"
            textAlignVertical={'top'}
          />
          <Input3
            multiline={true}
            numberOfLines={4}
            label="Related Education backgrounds and results"
            placeholder="(Example: Nus yr 4 Mech Engineering or Working, Account Executive)"
            textAlignVertical={'top'}
          />
          <Input3
            multiline={true}
            numberOfLines={4}
            label="Levels and Subjects you are interested to teach"
            placeholder="(---------------------)"
            textAlignVertical={'top'}
          />

          <View style={{paddingVertical: 10}}>
            <Headline title={'OTHER PREFERENCE'} />
          </View>

          <GenderDropdown label={'Gender'} />
          <View style={{marginVertical: 5}}>
            <CategoryDropdown label={'Category'} />
          </View>
          <View style={{marginVertical: 5}}>
            <Input3
              multiline={true}
              numberOfLines={4}
              label="Comments"
              placeholder="(---------------------)"
              textAlignVertical={'top'}
            />
          </View>
        </View>
        <View style={{marginHorizontal: 40, paddingVertical: 10}}>
          <VioletButton
            buttonName={'SUBMIT'}
            onPress={() =>
              navigation.navigate(
                'TrainerOtp',
                // {select_type: select_type}
              )
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
  pageConatiner: {
    paddingHorizontal: 10,
    marginVertical: 20,
  },
});
