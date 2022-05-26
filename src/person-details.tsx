import * as React from "react";
import {
    Box,
    Circle,
    IconEmailRegular,
    IconHomeLight,
    IconKeyLight,
    IconMobileDeviceRegular,
    Inline,
    Stack,
    Tabs,
    Text3,
    Text4,
    useTheme,
} from "@telefonica/mistica";
import { type Person } from "./api";

type Props = {
    person: Person;
};

const ContactDetails: React.FC<Props> = ({ person }) => (
    <Stack space={24}>
        <Inline space={32} alignItems="center">
            <Circle size={100} backgroundImage={person.picture.large} />

            <Stack space={8}>
                <Text4 regular>
                    {[
                        person.name.title,
                        person.name.first,
                        person.name.last,
                    ].join(" ")}
                </Text4>
                <Stack space={0}>
                    <Inline space={8} alignItems="center">
                        <IconEmailRegular size={16} />
                        <Text3 light>{person.email}</Text3>
                    </Inline>
                    <Inline space={8} alignItems="center">
                        <IconMobileDeviceRegular size={16} />
                        <Text3 light>{person.cell}</Text3>
                    </Inline>
                </Stack>
            </Stack>
        </Inline>
    </Stack>
);
const AddressDetails: React.FC<Props> = ({ person }) => {
    const { colors } = useTheme();
    return (
        <Inline space={32} alignItems="center">
            <Circle size={100} backgroundColor={colors.neutralLow}>
                <IconHomeLight size={48} />
            </Circle>

            <Stack space={0}>
                <Text3 regular>
                    {person.location.street.name},{" "}
                    {person.location.street.number}
                </Text3>
                <Text3 regular>
                    {person.location.postcode} {person.location.city} (
                    {person.location.state})
                </Text3>
                <Text3 regular>{person.location.country}</Text3>
            </Stack>
        </Inline>
    );
};
const LoginDetails: React.FC<Props> = ({ person }) => {
    const { colors } = useTheme();
    return (
        <Inline space={32} alignItems="center">
            <Circle size={100} backgroundColor={colors.neutralLow}>
                <IconKeyLight size={48} />
            </Circle>

            <Stack space={0}>
                <span>
                    <Text3 regular>User: </Text3>
                    <Text3 light>{person.login.username}</Text3>
                </span>
                <span>
                    <Text3 regular>Password: </Text3>
                    <Text3 light>{person.login.password}</Text3>
                </span>
                <span>
                    <Text3 regular>User id: </Text3>
                    <Text3 light>{person.login.uuid}</Text3>
                </span>
            </Stack>
        </Inline>
    );
};

const PersonDetails: React.FC<Props> = ({ person }) => {
    const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

    const renderTab = () => {
        switch (selectedTabIndex) {
            case 0:
                return <ContactDetails person={person} />;
            case 1:
                return <AddressDetails person={person} />;
            case 2:
                return <LoginDetails person={person} />;
            default:
                return <ContactDetails person={person} />;
        }
    };

    return (
        <>
            <Tabs
                selectedIndex={selectedTabIndex}
                onChange={setSelectedTabIndex}
                tabs={[
                    { text: "Contact" },
                    { text: "Location" },
                    { text: "Login" },
                ]}
            />
            <Box paddingY={24}>{renderTab()}</Box>
        </>
    );
};

export default PersonDetails;
