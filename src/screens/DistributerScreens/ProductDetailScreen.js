import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import color from '../../assets/theme/color';
// import ItemDetail from '../component/ItemDetail';
import Header from '../../components/Header';
import PriceAndRating from '../../components/PriceAndRating';
// import Description from '../component/Description';
import {SIZES, FONTS} from '../../assets/theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import VioletButton from '../../components/VioletButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel from '../../components/Carousel';
import Heading from '../../components/Heading';
import ProductCard2 from '../../components/ProductCard2';
import axios from 'axios';
import {RenderHTML} from 'react-native-render-html';
import SelectDropdown from 'react-native-select-dropdown';
import {showMessage} from 'react-native-flash-message';
import {connect, useDispatch, useSelector} from 'react-redux';
import * as qs from 'qs';
import {API_URL} from '../../constants/Strings';
import Input2 from '../../components/inputs/Input2';
import {storeCart} from '../../store/cart/cartAction';
import BackButtonHeader from '../../components/BackButtonHeader';
const ProductDetailScreen = ({navigation, route, rdStoreCart, reduxCart}) => {
  const {id} = route.params;

  console.log('ID =====>', id);
  const reduxUser = useSelector(state => state.user);
  // console.log('reuxuser ====>>>>>', reduxUser);
  const [selSection, setSelSection] = useState('Description');
  const [productDetail, setProductDetail] = useState([]);
  const [img, setImg] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [htmlData, setHtmlData] = useState();
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [variants, setVariants] = useState([]);
  const [variantsId, setVariantsId] = useState('');
  const [variantsData, setVariantsData] = useState([]);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [recommendData, setRecommendData] = useState([]);

  const [count, setCount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const fonts = ['Montserrat-Regular'];
  const [inputs, setInputs] = React.useState({
    email: '',
    name: '',
    message: '',
  });
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const dropdownRef = useRef({});

  const changeSelection = selChange => {
    setSelSection(selChange);
  };
  const source = {
    html: `<div style="text-align:justify">
    <p>${htmlData}</p>
    </div>`,
  };
  // const flatListRef = useRef();
  // React.useEffect(() => {
  //   flatListRef.current?.scrollToIndex({
  //     index: index,
  //     animated: true,
  //   });
  // }, [index]);

  const scrollRef = useRef();
  let intervalId = null;

  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };
  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  const onSlideChange = useCallback(() => {
    const newIndex = selectedIndex === img.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: dimension.width * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = useCallback(() => {
    intervalId = setInterval(onSlideChange, 300000);
  }, [onSlideChange]);

  useEffect(() => {
    startInterval();

    return () => {
      clearInterval(intervalId);
    };
  }, [onSlideChange]);

  const onTouchStart = () => {
    clearInterval(intervalId);
  };

  const onTouchEnd = () => {
    startInterval();
  };

  const setIndex2 = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  // console.log("reduxbyuser", reduxUser);

  const processgetDetailData = () => {
    axios
      .get(
        `https://neumedis.myshopify.com/admin/api/2022-10/products/${id}.json`,
        {
          headers: {
            Authorization:
              'Basic MjRmMWJiMjQyNTNmOGVkMDNjNmFmY2VkMmVkMDVhY2M6c2hwYXRfMjgzZTZiNjMyOWIwOWM1OTI1YTkyOWNlMTczOTViNWQ=',
          },
        },
      )
      .then(function (res) {
        // console.log("res=====>", res);
        setProductDetail(res.data.product);
        setImg(res.data.product.images);
        setHtmlData(res.data.product.body_html);
        setVariants(res.data.product.variants);
      })
      .catch(function (err) {
        console.log('err', err);
      });
  };



  const processgetRecommendData = () => {
    axios
      .get(
        `https://neumedis.myshopify.com/admin/api/2022-10/products.json?intent=related&limit=6&section_id=product-recommendations&product_id=${id}`,
        {
          headers: {
            Authorization:
              'Basic MjRmMWJiMjQyNTNmOGVkMDNjNmFmY2VkMmVkMDVhY2M6c2hwYXRfMjgzZTZiNjMyOWIwOWM1OTI1YTkyOWNlMTczOTViNWQ=',
          },
        },
      )
      .then(function (res) {
        // console.log(res);
        setRecommendData(res.data.products);
      })
      .catch(function (err) {
        console.log('err', err);
      });
  };

  console.log('recomm', recommendData);
  useEffect(() => {
    processgetRecommendData();
  }, []);

  useEffect(() => {
    var updateHeader = new Headers();
    updateHeader.append('accept', 'application/json');
    updateHeader.append('Content-Type', 'application/x-www-form-urlencoded'),
      updateHeader.append('Cookie', 'PHPSESSID=i6pj1c12k87c7mgqqga5hr8ujm');

    var updateFormData = qs.stringify({
      updatesetting: '1',
    });

    axios
      .post(API_URL, updateFormData, {headers: updateHeader})
      .then(function (response) {
        // console.log('detail res', response);

        if (reduxUser.customer.sub_type == 'wholeseller') {
          setQty(response.data.data[0].wholeseller);
        } else if (reduxUser.customer.sub_type == 'retailer') {
          setQty(response.data.data[0].retailer);
        } else if (reduxUser.customer.sub_type == 'exclusive') {
          setQty(response.data.data[0].exclusive);
        }
      });
  }, []);

  useEffect(() => {
  console.log('Product detail=====', productDetail);

    processgetDetailData();
    // processgetHomeData();
  }, []);

  var AddtoCartHeader = new Headers();
  AddtoCartHeader.append('accept', 'application/json');
  AddtoCartHeader.append('Content-Type', 'application/x-www-form-urlencoded');
  AddtoCartHeader.append('Cookie', 'PHPSESSID=4hmmefi8onj5kb4aencrusnggs');

  var AddtoCartData = qs.stringify({
    addtocart: '1',
    product_id: id,
    product_name: productDetail.title,
    qty: qty,
    user_id: reduxUser.customer.id,
    images: img[0]?.src,
    variants: variantsData.name,
    sell_price: variantsData.price,
  });

  // console.log('formdata', AddtoCartData);

  const processAddtoCart = () => {
    axios
      .post(API_URL, AddtoCartData, {headers: AddtoCartHeader})
      .then(function (response) {
        console.log('addtocartres', response);
        if (response.data.success == 1) {
          processGetcartData();
          showMessage({
            message: 'Success',
            description: response.data.message,
            type: 'success',
          });
        }
      })
      .catch(function (error) {
        console.log('Error', error);
      });
  };

  // view cart api call

  const processGetcartData = () => {
    var getcartHeader = new Headers();
    getcartHeader.append('accept', 'application/json');
    getcartHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    getcartHeader.append('Cookie', 'PHPSESSID=suum1ijkct2niss9cppuoem8v1');

    var getcartFormdata = qs.stringify({
      viewcart: '1',
      user_id: reduxUser.customer.id,
    });

    if (!isDataLoaded) {
      axios
        .post(API_URL, getcartFormdata, {headers: getcartHeader})
        .then(function (response) {
          console.log('cart res ===||==', response);

          if (response.data.success == 0) {
            setCount(response.data.total_product);
          }
          setCartData(response.data.data);
          setCount(response.data.total_product);
        });
    }
  };
  console.log('count', count);

  useEffect(() => {
    processGetcartData();
    navigation.addListener('focus', () => processGetcartData());
  }, [count]);

  var reviewHeader = new Headers();
  reviewHeader.append('accept', 'application/json');
  reviewHeader.append('Content-Type', 'application/x-www-form-urlencoded');
  reviewHeader.append('Cookie', 'PHPSESSID=1kl3o5lrc91q5tcc0t08rt1bq0');

  var Reviewdata = qs.stringify({
    product_review: '1',
    user_id: reduxUser.customer.id,
    product_id: id,
    name: inputs.name,
    email: inputs.email,
    comments: inputs.message,
    rating: rating,
  });

  // console.log('enqdata', Reviewdata);

  const processAddEnquiry = () => {
    Keyboard.dismiss();
    var valid = true;
    if (!inputs.name) {
      valid = false;
      handleError('Please enter name', 'name');
    } else if (!inputs.name.match(/^[A-Z a-z]+$/i)) {
      handleError('Enter Only Alphabets', 'name');
      valid = false;
    } else {
      handleError(false);
    }

    // var emailValid = false;
    if (!inputs.email) {
      handleError('Please enter your email', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      valid = false;
    }

    if (!inputs.message) {
      handleError('Please enter your message', 'message');
      valid = false;
    }

    if (valid) {
      setLoading(true);
      axios
        .post(API_URL, Reviewdata, {headers: reviewHeader})
        .then(function (response) {
          // console.log('enqresponce', response);
          if (response.data.success == 1) {
            setLoading(false);
            setInputs('');
            setRating('');
            showMessage({
              message: 'Success',
              description: response.data.message,
              type: 'default',
              backgroundColor: 'green',
            });
          } else {
            setLoading(false);
            showMessage({
              message: 'Error',
              description: response.data.message,
              type: 'default',
              backgroundColor: color.red,
            });
          }
        });
    }
  };

  const ProcessAddWishlist = () => {
    var bodyFormData = new FormData();
    bodyFormData.append('addwishlist', '1');
    bodyFormData.append('user_id', reduxUser.customer.id);
    bodyFormData.append('product_id', id);
    bodyFormData.append('product_name', productDetail.title),
      bodyFormData.append('sell_price', variantsData.price);
    bodyFormData.append('images', img[0]?.src),
      bodyFormData.append('variants', variantsData.name);

    // console.log('wishfomdata====', bodyFormData);

    fetch(API_URL, {
      body: bodyFormData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then(response => {
        if (response?.success == 1) {
          // rdStoreFav(product_id);
          processgetDetailData();
          showMessage({
            message: 'Success ',
            description: 'Item added to wishlist',
            type: 'success',
            backgroundColor: color.primary_color,
          });
        } else {
          showMessage({
            message: 'Error ',
            description: 'Item Already Exists in Wishlist',
            type: 'error',
          });
        }
      })
      .catch(error =>
        showMessage({
          message: 'Error ',
          description: 'Some error occur',
          type: 'error',
        }),
      );
    // }
  };

  const processRemoveWishlist = () => {
    let payload = new FormData();
    payload.append('removewishlist', '1');
    payload.append('user_id', reduxUser.customer.id);
    payload.append('product_id', id);

    fetch(API_URL, {
      body: payload,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then(response => {
        if (response?.success == 1) {
          // rdStoreRemove(product_id);
          processgetDetailData();

          showMessage({
            message: 'Success',
            description: response?.message,
            type: 'default',
            backgroundColor: 'green',
          });
        } else {
          showMessage({
            message: 'Error',
            description: response?.message,
            type: 'default',
            backgroundColor: 'red',
          });
        }
      })
      .catch(err =>
        showMessage({
          message: 'Error ',
          description: 'Some error occur',
          type: 'error',
        }),
      );
  };

  const handleWishProcess = () => {
    id ? processRemoveWishlist() : ProcessAddWishlist();
  };

  const renderItem = ({item, index}) => {
    console.log("itemid", item)
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() =>
            navigation.push('ProductDetailScreen', {id: item.id})
          }
        >
        <ProductCard2
          img={{
            uri: item.image == null ? item.image : item.image.src,
          }}
          productName={item.title}
          // price={item.price}
          // disPrice={item.disPrice}
        />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={color.violet} />
      {/* <Header
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      /> */}
      <BackButtonHeader
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />
      <View style={{flex: 1, backgroundColor: color.white}}>
        <ScrollView>
          {/* <View>
            <Carousel />
          </View> */}
          <ImageBackground
            style={{
              width: dimension.width,
              marginTop: 20,
              backgroundColor: color.white,
              paddingVertical: 20,
            }}>
            <ScrollView
              horizontal
              ref={scrollRef}
              onMomentumScrollEnd={setIndex2}
              showsHorizontalScrollIndicator={false}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              pagingEnabled>
              {img.map((value, key) => (
                <View style={{marginHorizontal: 10}}>
                  <Image
                    //   source={{ uri: `${value.url}` }}
                    source={{uri: value.src}}
                    style={{
                      width: dimension?.width - 20,
                      height: 300,
                      resizeMode: 'cover',
                      borderRadius: 10,
                    }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
              ))}
            </ScrollView>
          </ImageBackground>
          {/* <TouchableOpacity
            onPress={handleWishProcess}
            style={{
              position: 'absolute',
              zIndex: 9999,
              // bottom: 0,
              top: 60,
              // left: 0,
              right: 30,
              // backgroundColor: 'black',
            }}>
            {id ? (
              <Ionicons color="red" size={35} name="heart" />
            ) : (
              <Ionicons color="red" size={35} name="heart-outline" />
            )}
          </TouchableOpacity> */}

          <View
            style={{
              marginHorizontal: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontFamily: 'Montserrat-Regular'}}>In stock</Text>
              <Text
                style={{
                  color: color.black,
                  fontSize: SIZES.h3,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {productDetail.title}
              </Text>
            </View>
            {/* <TouchableOpacity
              style={styles.cartBtn}
              onPress={() => navigation.navigate('CheckoutStack')}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.cartText}>View Cart</Text>
              </View>
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              marginVertical: 10,
              backgroundColor: color.primary_color,
              borderRadius: 10,
              marginHorizontal: 10,
            }}>
            <PriceAndRating
              AprroxRating="100+ Ratings"
              Price={variantsData.price}
              Rating="4.1"
            />
          </View>
          <View style={styles.SubParent}>
            <View style={styles.SubParent2}>
              <View>
                <SelectDropdown
                  data={variants.map(item => ({
                    name: item.title,
                    id: item.id,
                    imageId: item.image_id,
                    price: item.price,
                    productId: item.product_id,
                  }))}
                  defaultButtonText={'select variants'}
                  onSelect={(selectedItem, index) => {
                    setVariantsId(selectedItem.id);
                    setVariantsData(selectedItem);
                    // console.log('select', selectedItem);
                    // dropdownRef.current.reset(); // Reset Filter
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                  buttonStyle={{
                    overflow: 'hidden',
                    // width: 160,
                    color: color.white,
                    backgroundColor: color.primary_color,
                    flex: 1,
                    borderEndWidth: 1,
                    borderEndColor: color.white,
                  }}
                  buttonTextStyle={styles.btnTxt}
                  rowTextStyle={styles.row_text}
                  dropdownStyle={{width: 200}}
                />
              </View>
              <View
                style={{
                  backgroundColor: color.primary_color,
                  paddingHorizontal: SIZES.width / 16,
                  paddingVertical: SIZES.height / 60,
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text style={styles.text}>€{variantsData.price}</Text>
              </View>
            </View>
          </View>

          <View style={styles.multiView}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => changeSelection('Description')}>
              {selSection == 'Description' ? (
                <View style={styles.payView1}>
                  <Text style={styles.txt2}>Description</Text>
                </View>
              ) : (
                <View style={styles.payView2}>
                  <Text style={[styles.txt2, {color: color.black}]}>
                    Description
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => changeSelection('Reviews')}>
              {selSection == 'Reviews' ? (
                <View style={styles.payView1}>
                  <Text style={styles.txt2}>Reviews</Text>
                </View>
              ) : (
                <View style={styles.payView2}>
                  <Text style={[styles.txt2, {color: color.primary_color}]}>
                    Reviews
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {selSection == 'Description' && (
            <View style={styles.detailView}>
              <RenderHTML
                source={source}
                contentWidth={Dimensions.get('window').width}
              />
            </View>
          )}

          {selSection == 'Reviews' && (
            <View style={styles.reviewMainView}>
              <View style={styles.starView}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setRating(1)}>
                  <Entypo
                    name={rating >= 1 ? 'star' : 'star-outlined'}
                    size={30}
                    color={color.primary_color}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setRating(2)}>
                  <Entypo
                    name={rating >= 2 ? 'star' : 'star-outlined'}
                    size={30}
                    color={color.primary_color}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setRating(3)}>
                  <Entypo
                    name={rating >= 3 ? 'star' : 'star-outlined'}
                    size={30}
                    color={color.primary_color}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setRating(4)}>
                  <Entypo
                    name={rating >= 4 ? 'star' : 'star-outlined'}
                    size={30}
                    color={color.primary_color}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setRating(5)}>
                  <Entypo
                    name={rating >= 5 ? 'star' : 'star-outlined'}
                    size={30}
                    color={color.primary_color}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputMainView}>
                <View style={styles.inputView}>
                  <Input2
                    value={inputs.name}
                    label={'Name'}
                    placeholder="Enter here"
                    error={errors.name}
                    onChangeText={text => handleOnchange(text, 'name')}
                    onFocus={() => handleError(null, 'name')}
                  />
                  {/* <TextInput style={styles.input} placeholder="Name" /> */}
                </View>
                <View style={styles.inputView2}>
                  <Input2
                    value={inputs.email}
                    label={'Email'}
                    placeholder="Enter here"
                    error={errors.email}
                    onFocus={() => handleError(null, 'email')}
                    onChangeText={text => handleOnchange(text, 'email')}
                  />
                </View>
              </View>
              <View style={styles.messageInputView}>
                <Input2
                  value={inputs.message}
                  label={'Message'}
                  placeholder="Enter here"
                  onChangeText={text => handleOnchange(text, 'message')}
                  onFocus={() => handleError(null, 'message')}
                  error={errors.message}
                  numberOfLines={4}
                  textAlignVertical={'top'}
                />
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={processAddEnquiry}>
                  <Text style={styles.btnTxt2}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Heading HeadLine={'RECOMMENDED'} />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}>
            {/* <TouchableOpacity
              onPress={() => {
                if (index === 0) {
                  return;
                }
                setIndex(index - 1);
              }}>
              <AntDesign name="left" size={25} color={color.primary_color} />
            </TouchableOpacity> */}
            <FlatList
              data={recommendData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              renderItem={renderItem}
            />
            {/* <View style={styles.ButtonBox}> */}
            {/* <TouchableOpacity
              onPress={() => {
                if (index === data.length - 1) {
                  return;
                }
                setIndex(index + 1);
              }}>
              <AntDesign name="right" size={25} color={color.primary_color} />
            </TouchableOpacity> */}
            {/* </View> */}
          </View>

          {/* <View style={styles.ShowAll}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DistributerRecommendedScreen')
              }>
              <Text style={{fontFamily: FONTS.primarytext1}}>Show All</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
        <View style={styles.btnView2}>
          {!variantsData.name ? (
            <VioletButton buttonName={'select varient'} />
          ) : (
            <VioletButton
              buttonName={'ADD TO CART'}
              // onPress={() => navigation.navigate('CheckoutStack')}
              onPress={processAddtoCart}
            />
          )}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  SubParent: {
    marginVertical: 20,
    // backgroundColor: color.red,
    borderRadius: 10,
    marginHorizontal: 10,
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  SubParent2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: SIZES.width / 30,
  },
  text: {
    color: color.white,
    fontSize: SIZES.h3 + 1,
    fontFamily: 'Montserrat-SemiBold',
  },
  cartText: {
    fontWeight: 'bold',
    fontSize: SIZES.h3,
    color: color.white,
  },
  cartBtn: {
    backgroundColor: color.primary_color,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  mainView: {
    // flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.text_primary,
    paddingVertical: SIZES.height / 36,
    height: 100,
    width: 107,
    borderRadius: 6,
    // marginHorizontal: 10,

    margin: SIZES.base,
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: SIZES.height / 18,
    width: SIZES.width / 7,
    tintColor: color.text_primary,
  },
  txtView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  txt: {
    textAlign: 'center',
    fontSize: SIZES.h4 - 6,
    fontWeight: 'bold',
    color: color.white,
  },
  // multiView: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   flexDirection: "row",
  //   marginTop: SIZES.height / 40,
  //   // backgroundColor: "red",
  //   marginHorizontal: SIZES.width / 30,
  //   borderBottomColor: color.primary_color,
  //   borderBottomWidth: 1,
  // },
  // payView1: {
  //   flex: 1,
  //   borderWidth: 1,
  //   backgroundColor: color.text_primary,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: SIZES.height / 64,
  //   // marginHorizontal: 20,
  //   width: SIZES.width / 3.5,
  //   borderColor: color.text_primary,
  // },
  // payView2: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: SIZES.height / 64,
  //   width: SIZES.width / 3.5,
  // },
  // txt2: {
  //   flex: 1,
  //   color: color.black,
  //   fontSize: SIZES.h3 - 3,
  //   fontWeight: "500",
  // },
  multiView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SIZES.height / 40,
    marginHorizontal: SIZES.width / 30,
    borderBottomColor: color.primary_color,
    borderBottomWidth: 1,
  },
  payView1: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: color.primary_color,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.height / 64,
    // marginHorizontal: 20,
    // width: SIZES.width / 3.5,
    borderColor: color.primary_color,
  },
  payView2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.height / 64,
    // width: SIZES.width / 3.5,
  },
  txt2: {
    flex: 1,
    color: color.white,
    fontSize: SIZES.h3 - 3,
    fontFamily: 'Montserrat-Bold',
  },
  detailView: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  detailTxt: {
    // fontFamily: FONTS.Rubik_medium,
    textAlign: 'justify',
    color: color.black,
    marginVertical: 5,
  },
  reviewMainView: {
    marginVertical: SIZES.height / 64,
  },
  starView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputMainView: {
    paddingHorizontal: SIZES.width / 20,
    marginTop: SIZES.height / 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputView: {
    // borderWidth: 0.5,
    // borderColor: color.black,
    width: SIZES.width / 2.9,
    // paddingHorizontal: 10,
    // borderRadius: 5,
  },
  input: {
    height: SIZES.height / 20,
  },
  inputView2: {
    // borderWidth: 0.5,
    // borderColor: color.black,
    width: SIZES.width / 1.9,
    // paddingHorizontal: 10,
    // borderRadius: 5,
  },
  messageInputView: {
    // borderWidth: 0.5,
    // borderColor: color.black,
    marginHorizontal: SIZES.width / 20,
    marginTop: 10,
    // paddingHorizontal: 10,
    // borderRadius: 5,
  },
  messageInput: {
    paddingVertical: 5,
  },
  btnView: {
    marginVertical: SIZES.height / 64,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: SIZES.width / 20,
  },
  btn: {
    backgroundColor: color.primary_color,
    paddingHorizontal: SIZES.width / 10,
    paddingVertical: SIZES.height / 64,
    borderRadius: 5,
  },
  btnTxt: {
    fontSize: SIZES.h3,
    color: color.white,
    fontFamily: 'Montserrat-SemiBold',
    // marginRight: SIZES.width / 14,
    left: 20,
  },
  btnTxt2: {
    fontSize: SIZES.h3,
    color: color.white,
    fontFamily: FONTS.primarytext2,
    // marginRight: SIZES.width / 14,
    // left: 20,
  },
  ShowAll: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 30,
  },
});

const mapStateToProps = state => {
  return {
    reduxCart: state.cart,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    rdStoreCart: newCart => dispatch(storeCart(newCart)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailScreen);
