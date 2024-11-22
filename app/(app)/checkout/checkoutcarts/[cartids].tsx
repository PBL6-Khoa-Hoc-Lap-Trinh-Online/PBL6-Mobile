import { checkoutCartApi, getDeliveryMethodsApi, getPaymentMethodsApi } from '@/apis/checkout';
import { getAllAddress } from '@/apis/user';
import Badge from '@/components/badge/Badge';
import Button from '@/components/button/Button';
import CartCard from '@/components/cartCard/CartCard';
import CheckBox from '@/components/checkBox/CheckBox';
import HorizontalRule from '@/components/horizontalRule/HorizontalRule';
import ItemCheckbox from '@/components/itemCheckbox/ItemCheckbox';
import Row from '@/components/row/Row';
import Space from '@/components/space/Space';
import ThemeText from '@/components/themeText/ThemeText';
import ThemeView from '@/components/themeView/ThemeView';
import { CartContext } from '@/context/cart';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Address } from '@/type/addressType';
import { DeliveryMethod } from '@/type/deliveryType';
import { PaymentMethod } from '@/type/paymentType';
import { convertPrice } from '@/utils/convertPrice';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { Back, ShoppingCart } from 'iconsax-react-native';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const countProduct = (cartItems: any) => {
    return cartItems.reduce((acc: number, item: any) => acc + item.cart_quantity, 0);
}

const checkout = async (
    cartItems: any,
    selectedAddress: Address,
    selectedDeliveryMethod: DeliveryMethod,
    selectedPaymentMethod: PaymentMethod
) => {
    try {
        return checkoutCartApi(
            selectedAddress.receiver_address_id,
            selectedPaymentMethod.payment_method_id,
            selectedDeliveryMethod.delivery_method_id,
            cartItems.map((item: any) => item.cart_id)
        )
    } catch (error: any) {
        console.log(error);
        Toast.show({
            text1: "Error",
            text2: error.message,
            type: 'error'
        })
    }
}
const CheckoutCard = () => {
    const width = useWindowDimensions().width;
    const { cartids } = useLocalSearchParams<{
        cartids: string;
    }>();
    const cartIds: number[] = JSON.parse(cartids);
    const { cartItems, reloadData } =
        useContext(CartContext);
    const cartItemsFiltered = cartItems.filter((item) =>
        cartIds.includes(item.cart_id)
    );

    const [loading, setLoading] = React.useState(false);

    const [addressList, setAddressList] = React.useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = React.useState<Address>();
    const [deliveryMethod, setDeliveryMethod] = React.useState<DeliveryMethod[]>([]);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = React.useState<DeliveryMethod>();
    const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<PaymentMethod>();


    const snapPoints = useMemo(() => ["50%"], []);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const handleOpenBottomSheet = async () => {
        bottomSheetRef.current?.snapToIndex(1);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllAddress();
                setAddressList(response.data);
                setSelectedAddress(response.data[0]);

                const deliveryMethod = await getDeliveryMethodsApi();
                setDeliveryMethod(deliveryMethod.data);
                setSelectedDeliveryMethod(deliveryMethod.data[0]);
                const paymentMethod = await getPaymentMethodsApi();
                setPaymentMethod(paymentMethod.data);
                setSelectedPaymentMethod(paymentMethod.data[0]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);


    const background = useThemeColor({}, "background");
    const text = useThemeColor({}, "text");
    const border = useThemeColor({}, "border");
    const itemBackground = useThemeColor({}, "itemBackground");

    return (
        <ThemeView>
            {/* // Header ------------------- */}
            <Row
                style={{
                    justifyContent: "space-between",
                    backgroundColor: background,
                    alignItems: "center",
                    marginBottom: 8,
                }}
            >
                <Button
                    variant="circle"
                    icon={<Back size={20} color={text} />}
                    onPress={() => {
                        router.back();
                    }}
                />
                <ThemeText text="Checkout" type="title" />

                <Badge count={cartItems.length}>
                    <Button
                        variant="circle"
                        icon={
                            <ShoppingCart
                                size={20}
                                color={text}
                            />
                        }
                        onPress={() => {
                            router.navigate("/(app)/cart");
                        }}
                    />
                </Badge>
            </Row>
            <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
                {
                    cartItemsFiltered.map((item) => (
                        <CartCard
                            type='small'
                            key={item.product_id}
                            productImage={item.product_images?.[0] ?? ""}
                            productName={item.product_name}
                            cartPrice={Number.parseFloat(item.cart_price)}
                            cartQuantity={item.cart_quantity}
                            style={{
                                marginBottom: 8,
                                pointerEvents: "none",
                                marginHorizontal: 8
                            }}
                        />
                    ))
                }
                <Space size={{ height: 16, width: 0 }} />
                <HorizontalRule text='' type='normal' />
                <Space size={{ height: 16, width: 0 }} />
                <ThemeView>
                    <ThemeText type='medium' text='Delivery Address'
                        style={{
                            fontWeight: 'bold',
                        }}
                    />
                    <Space size={{ height: 16, width: 0 }} />
                    {
                        selectedAddress && (
                            <TouchableOpacity
                                style={{
                                    padding: 16,
                                    borderRadius: 8,
                                    marginBottom: 8,
                                    backgroundColor: itemBackground,
                                }}
                                onPress={handleOpenBottomSheet}
                            >
                                <Row justifyContent="space-between">
                                    <ThemeText
                                        type="medium"
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                        text={selectedAddress.receiver_name}
                                    />
                                </Row>
                                <Space size={{ height: 8, width: 0 }} />
                                <ThemeText
                                    text={selectedAddress.receiver_phone}
                                    type="medium"
                                    style={{}}
                                />
                                <Space size={{ height: 8, width: 0 }} />
                                <ThemeText
                                    text={`${selectedAddress.receiver_address}, ${selectedAddress.ward_name}, ${selectedAddress.district_name}, ${selectedAddress.province_name}`}
                                    type="medium"
                                    style={{}}
                                />
                            </TouchableOpacity>
                        )
                    }
                </ThemeView>
                <ThemeView>
                    <ThemeText type='medium' text='Delivery method'
                        style={{
                            fontWeight: 'bold',
                        }}
                    />
                    <Space size={{ height: 16, width: 0 }} />
                    <ItemCheckbox
                        isChecked={selectedDeliveryMethod?.delivery_method_id === deliveryMethod[0]?.delivery_method_id}
                        checkedChange={() => {
                            setSelectedDeliveryMethod(deliveryMethod[0]);
                        }}
                        label={deliveryMethod[0]?.delivery_method_name}
                        delivery_method_description={deliveryMethod[0]?.delivery_method_description}
                        delivery_fee={convertPrice(Number(deliveryMethod[0]?.delivery_fee))}
                    />
                    <Space size={{ height: 8, width: 0 }} />
                    <ItemCheckbox
                        isChecked={selectedDeliveryMethod?.delivery_method_id === deliveryMethod[1]?.delivery_method_id}
                        checkedChange={() => {
                            setSelectedDeliveryMethod(deliveryMethod[1]);
                        }}
                        label={deliveryMethod[1]?.delivery_method_name}
                        delivery_method_description={deliveryMethod[0]?.delivery_method_description}
                        delivery_fee={convertPrice(Number(deliveryMethod[1]?.delivery_fee))}
                    />
                </ThemeView>
                <Space size={{ height: 16, width: 0 }} />
                <ThemeView>
                    <ThemeText type='medium' text='Payment method'
                        style={{
                            fontWeight: 'bold',
                        }}
                    />
                    <Space size={{ height: 16, width: 0 }} />
                    <Row justifyContent='space-between'>
                        <View style={{
                            width: (width - 32) / 2 - 4,
                        }}>
                            <ItemCheckbox
                                isChecked={selectedPaymentMethod?.payment_method_id === paymentMethod[0]?.payment_method_id}
                                checkedChange={() => {
                                    setSelectedPaymentMethod(paymentMethod[0]);
                                }}
                                label={paymentMethod[0]?.payment_method_description.toLocaleUpperCase()}
                            />
                        </View>
                        <View style={{
                            width: (width - 32) / 2 - 4,
                        }}>
                            <ItemCheckbox
                                isChecked={selectedPaymentMethod?.payment_method_id === paymentMethod[1]?.payment_method_id}
                                checkedChange={() => {
                                    setSelectedPaymentMethod(paymentMethod[1]);
                                }}
                                label={paymentMethod[1]?.payment_method_description.toLocaleUpperCase()}
                            />
                        </View>
                    </Row>
                </ThemeView>
                <Space size={{ height: 16, width: 0 }} />
                <ThemeView>
                    <ThemeText type='medium' text='Payment Detail'
                        style={{
                            fontWeight: 'bold',
                        }}
                    />
                    <Space size={{ height: 8, width: 0 }} />
                    <Row justifyContent='space-between'>
                        <ThemeText text={`Estimated Price (${countProduct(cartItemsFiltered)} products)`} type='medium' />
                        <Row>
                            <ThemeText text={convertPrice(cartItemsFiltered.reduce((acc, item) => acc + Number.parseFloat(item.cart_price), 0))} type='medium'
                                style={{
                                    fontWeight: 'bold',
                                }}
                            />
                            <Space size={{ height: 0, width: 8 }} />
                            <ThemeText text='VND' type='small' />
                        </Row>
                    </Row>
                    <Space size={{ height: 8, width: 0 }} />
                    <Row justifyContent='space-between'>
                        <ThemeText text='Delivery Fee' type='medium' />
                        <Row>
                            <ThemeText text={convertPrice(Number(selectedDeliveryMethod?.delivery_fee))} type='medium'
                                style={{
                                    fontWeight: 'bold',
                                }}
                            />
                            <Space size={{ height: 0, width: 8 }} />
                            <ThemeText text='VND' type='small' />
                        </Row>
                    </Row>
                    <Space size={{ height: 16, width: 0 }} />
                    <Row justifyContent='flex-end'>
                        <View>
                            <ThemeText text='Total' type='medium' style={{
                                textAlign: 'right',
                                fontWeight: 'bold',
                            }} />
                            <Row>
                                <ThemeText text={convertPrice(cartItemsFiltered.reduce((acc, item) => acc + Number.parseFloat(item.cart_price), 0) + Number(selectedDeliveryMethod?.delivery_fee))} type='medium'
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 24,
                                        lineHeight: 24,
                                    }}
                                />
                                <Space size={{ height: 0, width: 8 }} />
                                <ThemeText text='VND' type='small' />
                            </Row>
                        </View>
                    </Row>
                </ThemeView>
                <Space size={{ height: 16, width: 0 }} />
                <HorizontalRule />
                <Space size={{ height: 16, width: 0 }} />
                <ThemeView>
                    <Button
                        loading={loading}
                        text='Pay Now'
                        onPress={async () => {
                            setLoading(true);
                            if (selectedAddress && selectedDeliveryMethod && selectedPaymentMethod) {
                                try {
                                    const rs = await checkout(cartItemsFiltered, selectedAddress, selectedDeliveryMethod, selectedPaymentMethod);
                                    reloadData()
                                    Toast.show({
                                        text1: "Success",
                                        text2: "Checkout successfully",
                                        type: 'success'
                                    })
                                    if (selectedPaymentMethod.payment_method_id === 1) {
                                        router.navigate("/(app)/(tabs)/orders")
                                    }
                                    if (selectedPaymentMethod.payment_method_id === 2) {
                                        const checkoutUrl = rs?.data;
                                        router.replace(
                                            `/(app)/checkout/payment/${encodeURIComponent(checkoutUrl)}` as Href,
                                        )
                                    }
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                            setLoading(false);
                        }}
                    />
                </ThemeView>
                <Space size={{ height: 16, width: 0 }} />
            </ScrollView>

            {/* // BottomSheet  */}
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                index={-1}
                backgroundStyle={{
                    borderColor: useThemeColor({}, "border"),
                    borderWidth: 1,
                }}
            >
                <BottomSheetScrollView
                    style={{
                        backgroundColor: useThemeColor({}, "background"),
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        paddingHorizontal: 8,
                    }}
                >
                    <ThemeText
                        type="medium"
                        text="Select Address"
                        style={{
                            fontWeight: "bold",
                            padding: 16,
                            textAlign: "center",
                        }}
                    />
                    <Space size={{ height: 8, width: 0 }} />
                    <ThemeView>
                        {
                            addressList.map((address) => (
                                <View
                                    key={address.receiver_address_id}
                                    style={{
                                        padding: 16,
                                        borderColor: border,
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        marginBottom: 8,
                                    }}
                                >
                                    <Row justifyContent="space-between">
                                        <ThemeText
                                            type="medium"
                                            style={{
                                                fontWeight: "bold",
                                            }}
                                            text={address.receiver_name}
                                        />
                                        <CheckBox
                                            isChecked={selectedAddress?.receiver_address_id === address?.receiver_address_id}
                                            checkedChange={() => {
                                                setSelectedAddress(address);
                                                bottomSheetRef.current?.snapToIndex(0);
                                            }}
                                        />
                                    </Row>
                                    <Space size={{ height: 8, width: 0 }} />
                                    <ThemeText
                                        text={address.receiver_phone}
                                        type="medium"
                                        style={{}}
                                    />
                                    <Space size={{ height: 8, width: 0 }} />
                                    <ThemeText
                                        text={`${address.receiver_address}, ${address.ward_name}, ${address.district_name}, ${address.province_name}`}
                                        type="medium"
                                        style={{}}
                                    />
                                </View>
                            ))
                        }
                    </ThemeView>
                </BottomSheetScrollView>
            </BottomSheet>
            {/* // BottomSheet  */}
        </ThemeView>
    )
}

export default CheckoutCard