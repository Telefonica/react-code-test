import {
    Circle,
    MainNavigationBar,
    MainSectionHeader,
    MainSectionHeaderLayout,
    MasterDetailLayout,
    NavigationBar,
    NegativeBox,
    Row,
    RowList,
    useScreenSize,
} from "@telefonica/mistica";
import React from "react";
import { type Person } from "./api";
import PersonDetails from "./person-details";

type MainSection = "People" | "Favorites";

const App = (): JSX.Element => {
    const { isTabletOrSmaller } = useScreenSize();

    const people: Array<Person> = []; // TODO Task 1: fetch people from API
    let selectedPerson: Person | null = null; // TODO Task 1: implement the logic to select a person

    const mainSections = ["People"] as const;
    const section: MainSection = "People";

    return (
        <main>
            {(!isTabletOrSmaller || !selectedPerson) && (
                <>
                    <MainNavigationBar
                        isInverse
                        selectedIndex={section === "People" ? 0 : 1}
                        sections={mainSections.map((section) => ({
                            title: section,
                            onPress: () => {
                                console.log("Section pressed (Task 6)");
                            },
                        }))}
                    />
                    <MainSectionHeaderLayout>
                        <MainSectionHeader title={section} />
                    </MainSectionHeaderLayout>
                </>
            )}

            <MasterDetailLayout
                isOpen={!!selectedPerson}
                master={
                    <NegativeBox>
                        <RowList>
                            {people.map((person) => (
                                <Row
                                    asset={
                                        <Circle
                                            size={40}
                                            backgroundImage={
                                                person.picture.medium
                                            }
                                        />
                                    }
                                    title={[
                                        person.name.first,
                                        person.name.last,
                                    ].join(" ")}
                                    onPress={() => {
                                        console.log(
                                            "Person row pressed (Task 1)"
                                        );
                                    }}
                                />
                            ))}
                        </RowList>
                    </NegativeBox>
                }
                detail={
                    selectedPerson ? (
                        <>
                            <NavigationBar
                                isInverse={isTabletOrSmaller}
                                topFixed={isTabletOrSmaller}
                                onBack={() => {
                                    console.log("Navbar back pressed (Task 1)");
                                }}
                                title={selectedPerson.name.first}
                            />
                            <PersonDetails person={selectedPerson} />
                        </>
                    ) : null
                }
            />
        </main>
    );
};

export default App;
