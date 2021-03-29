import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import api from './api';
import {
  Container,
  Header,
  Content,
  Tab,
  TabHeading,
  Tabs,
  Spinner,
} from 'native-base';
// import Sound from 'react-native-sound';
import SoundPlayer from 'react-native-sound-player';
// import {Icon} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Close from 'react-native-vector-icons/AntDesign';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

const App = () => {
  const [searchWord, setSearchWord] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [wordLoaded, setWordLoaded] = useState(false);
  const [wordIsLoaded, setWordIsLoaded] = useState(false);
  const [wordDefinitions, setWordDefinitions] = useState([]);

  const playSound = async audioUrl => {
    // const result = await api.get(audioUrl);
    // console.log(`result`, result);

    console.log('sound :>> ', audioUrl);
    SoundPlayer.playUrl(audioUrl);
    SoundPlayer.stop();
    // const s = SoundPlayer.loadUrl(audioUrl);
    // s.play();
    console.log(`SoundPlayer.loadUrl(audioUrl)`, SoundPlayer.loadUrl(audioUrl));
    console.log(`SoundPlayer`, SoundPlayer.getInfo());
    // const soundVar = new Sound(audioUrl, Sound.MAIN_BUNDLE, err => {
    //   if (err) {
    //     console.log('Cannot Play Sound');
    //   }
    // });
    // soundVar.play();
    // setTimeout(() => {}, 200);
    // soundVar.release();
  };
  const getDefinitions = async () => {
    setWordIsLoaded(true);
    setWordLoaded(true);
    const result = await api.get(`/api/v2/words/en-gb?q=${searchWord}`, {
      headers: {
        Accept: 'application/json',
        app_id: 'c2e7b1fe',
        app_key: 'b41be5b3b08f91ebe3d849570f15c52a',
      },
      // headers: {
      //   Accept: 'application/json',
      //   app_id: '88ff4408',
      //   app_key: '565b4b0c9f80338b2512ae00ccd49834',
      // },
    });
    console.log(
      `result`,
      result.data.results[0].lexicalEntries[0].entries[0].senses[0],
    );
    setWordDefinitions(
      result.data.results[0].lexicalEntries[0].entries[0].senses,
    );
    setAudioUrl(
      result.data.results[0].lexicalEntries[0].entries[0].pronunciations[0]
        .audioFile,
    );
    setWordLoaded(false);
  };
  let count = 0;

  return (
    <View style={{flex: 1, backgroundColor: '#EFE6DD'}}>
      <StatusBar backgroundColor="#CD0916" />
      <View
        style={{
          backgroundColor: '#CD0916',
          height: HEIGHT / 3,
          alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <View
          style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#fff', fontSize: 30}}>Dictionary</Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              paddingHorizontal: 20,
              textAlign: 'center',
            }}>
            Search for vast amount of words in oxford dictionary
          </Text>
        </View>
        <View
          style={{
            height: HEIGHT / 14,
            borderRadius: 16,
            flexDirection: 'row',
            marginVertical: 10,
            width: WIDTH * 1 - 30,
            marginHorizontal: 10,
            backgroundColor: '#fff',
            // justifyContent: 'space-between',
          }}>
          <Icon
            name="search"
            style={{
              fontSize: 30,
              alignSelf: 'center',
              paddingHorizontal: 20,
              flexBasis: '20%',
            }}
          />

          <TextInput
            onChangeText={word => setSearchWord(word)}
            value={searchWord}
            style={{
              width: 100,
              color: '#333',
              flexBasis: '70%',
            }}
            placeholder="Search word"
            placeholderTextColor="#333"
          />
          {searchWord !== '' ? (
            <Close
              onPress={() => {
                setWordIsLoaded(false);
                setWordDefinitions([]);

                setSearchWord('');
              }}
              name="close"
              style={{
                fontSize: 22,
                alignSelf: 'center',
                paddingRight: 20,
                flexBasis: '25%',
              }}
            />
          ) : null}
        </View>
        <TouchableOpacity
          onPress={getDefinitions}
          style={{
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 10,
            margin: 10,
          }}>
          <Text>Get definition</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#EFE6DD',
          flex: 1.6,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          // top: -30,
        }}>
        {!wordIsLoaded ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              flex: 1,
            }}>
            <Image
              source={{
                uri:
                  'https://image.freepik.com/free-vector/debating-club-abstract-concept-illustration-classroom-debates-eloquent-speech-debating-competition-school-club-public-speaking-class-effective-communication-skill_335657-3499.jpg',
              }}
              style={{
                height: HEIGHT / 3,
                borderRadius: 20,
                marginTop: 20,
                width: WIDTH * 0.9,
              }}
            />
            <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>
              Give us a word and return back a definitions
            </Text>
          </View>
        ) : (
          <>
            {wordLoaded ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Spinner color="#333" size={40} />
              </View>
            ) : (
              <Container
                style={{
                  marginTop: 20,
                  width: WIDTH,
                  paddingHorizontal: 20,
                  backgroundColor: '#EFE6DD',
                }}>
                {/* <Header hasTabs style={{backgroundColor: 'red'}} /> */}
                <Tabs
                  tabBarUnderlineStyle={{
                    backgroundColor: '#CD0916',
                  }}>
                  <Tab
                    heading={
                      <TabHeading style={{backgroundColor: '#EFE6DD'}}>
                        <Text>Definitions</Text>
                      </TabHeading>
                    }>
                    <ScrollView
                      style={{paddingVertical: 20, paddingHorizontal: 10}}>
                      {wordDefinitions.map((w, i) => {
                        if (Object.keys(w).includes('definitions'))
                          return (
                            <View style={{marginBottom: 20}}>
                              <Text
                                style={{
                                  color: '#333',
                                  textTransform: 'capitalize',
                                  fontStyle: 'italic',
                                  paddingVertical: 10,
                                  fontSize: 18,
                                }}>
                                {1 + i} . {w.definitions}
                              </Text>
                              {/* <Text style={{color: 'blue'}}>{audioUrl}</Text> */}
                            </View>
                          );
                      })}
                    </ScrollView>
                  </Tab>
                  <Tab
                    heading={
                      <TabHeading style={{backgroundColor: '#EFE6DD'}}>
                        <Text>Examples</Text>
                      </TabHeading>
                    }>
                    <ScrollView
                      style={{paddingHorizontal: 10, paddingVertical: 20}}>
                      {wordDefinitions.map((w, i) => {
                        return (
                          <View style={{marginBottom: 20}}>
                            {Object.keys(w).includes('examples') ? (
                              <>
                                {w.examples.map((e, x) => {
                                  count += 1;
                                  return (
                                    <Text
                                      style={{
                                        color: '#333',
                                        textTransform: 'capitalize',
                                        fontStyle: 'italic',
                                        paddingVertical: 10,
                                        fontSize: 18,
                                      }}>
                                      {count} . {e.text}
                                    </Text>
                                  );
                                })}
                              </>
                            ) : null}
                          </View>
                        );
                      })}
                    </ScrollView>
                  </Tab>
                </Tabs>
              </Container>
            )}
          </>
        )}
      </View>

      {/* <Button title="Play" onPress={() => playSound(audioUrl)} /> */}
    </View>
  );
};

export default App;
