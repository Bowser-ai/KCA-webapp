import { mount } from "@vue/test-utils";
import MainScreen from "@/views/Mainscreen";

describe("Mainscreen.vue", () => {
  const wrapper = mount(MainScreen, {
    propsData: {
      filialen: {
        1156: {
          filiaalnummer: 1156,
          address: "address",
          postcode: "6543GH",
          info: "yoyo",
          tel: "0645435",
        },
        1259: {
          filiaalnummer: 1259,
          address: "address2",
          postcode: "8943ZV",
          info: "oppassen",
          tel: "06343435",
        },
        16: {
          filiaalnummer: 16,
          address: "address3",
          postcode: "3432JD",
          info: "laat maar",
          tel: "06345399",
        },
      },
    },
  });
  it("Mainscreen loads correctly", () => {
    expect(wrapper.text()).toContain("Filiaal Zoeken");
  });
  it("searching filiaal", async () => {
    const searchField = wrapper.find("#search-field");
    searchField.setValue("1156");
    await searchField.trigger("keyup.enter");
    const filiaalCard = wrapper.findComponent({ name: "FiliaalCard" });
    expect(filiaalCard.exists()).toBe(true);
    expect(filiaalCard.html()).toContain("1156");
    expect(filiaalCard.html()).toContain("address");
    expect(filiaalCard.html()).toContain("6543GH");
    expect(filiaalCard.html()).toContain("yoyo");
    expect(filiaalCard.html()).toContain("0645435");
  });
  it("non-existing-filiaal should not create a FiliaalCard", async () => {
    const searchField = wrapper.find("#search-field");
    searchField.setValue("1299");
    await searchField.trigger("keyup.enter");
    const filiaalCard = wrapper.findComponent({ name: "FiliaalCard" });
    expect(filiaalCard.exists()).toBe(false);
    expect(wrapper.html()).toContain(
      'filiaal met nummer: "1299" niet gevonden'
    );
  });
  it("search address", async () => {
    await wrapper.find('input[value="adres/plaats"]').trigger("change");
    const searchField = wrapper.find("#search-field");
    searchField.setValue("address3");
    await searchField.trigger("keyup.enter");
    const filiaalCard = wrapper.findComponent({ name: "FiliaalCard" });
    expect(filiaalCard.exists()).toBe(true);
    expect(filiaalCard.html()).toContain("16");
  });
  it("search zipcode", async () => {
    await wrapper.find('input[value="postcode"]').trigger("change");
    const searchField = wrapper.find("#search-field");
    searchField.setValue("8943ZV");
    await searchField.trigger("keyup.enter");
    const filiaalCard = wrapper.findComponent({ name: "FiliaalCard" });
    expect(filiaalCard.exists()).toBe(true);
    expect(filiaalCard.html()).toContain("1259");
  });
});
