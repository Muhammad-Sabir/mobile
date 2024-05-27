import React, { Component, ContextType } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../../components/SearchBar";
import Slider from "../../components/Slider";
import SpecialityList from "../../components/SpecialityList";
import DoctorList from "../../components/DoctorList";
import { UserContext, UserT } from "../../contexts/UserContext";

interface UserDetails {
  name?: string;
}

interface Props {}

class Index extends Component<Props> {
  static contextType = UserContext;

  render() {
    const context = this.context as ContextType<typeof UserContext>;
    const { userDetails } = context as { userDetails: UserT };

    return (
      <ScrollView className="bg-white">
        {/* patient's overview */}
        <View className="flex-row items-center justify-between p-4 mt-16">
          <View className="flex-row items-center">
            <View className="ml-1 rounded-full h-10 w-10 flex items-center justify-center bg-[#045883] text-white">
              <Text className="text-lg font-bold text-white">F</Text>
            </View>
            <View className="ml-4">
              <Text className="text-black text-md">Welcome</Text>
              <Text className="text-md font-bold text-[#045883]">
                {userDetails.name || "Fatima Iqbal"}
              </Text>
            </View>
          </View>
          <Ionicons size={28} name="notifications-outline" color="black" />
        </View>

        {/* searchbar for searching drs */}
        <SearchBar placeholder="Search doctors by speciality" />

        {/* banner slider */}
        <Slider />

        {/* doctor specialities section */}
        <View className="px-4">
          <View className="flex flex-row items-center justify-between mb-2">
            <Text className="font-bold text-md">Categories</Text>
            <TouchableOpacity>
              <Text className="text-[#045883] text-md">See All</Text>
            </TouchableOpacity>
          </View>
          <SpecialityList />
        </View>

        {/* top cardiologists section */}
        <View className="px-4 mt-2">
          <View className="flex flex-row items-center justify-between mb-2">
            <Text className="font-bold text-md">Top Rated Cardiologists</Text>
            <TouchableOpacity>
              <Text className="text-[#045883] text-md">See All</Text>
            </TouchableOpacity>
          </View>
          <DoctorList specialty="Cardiology" />
        </View>

        {/* top dermatologist section */}
        <View className="px-4 mt-2">
          <View className="flex flex-row items-center justify-between mb-2">
            <Text className="font-bold text-md">Top Rated Dermatologists</Text>
            <TouchableOpacity>
              <Text className="text-[#045883] text-md">See All</Text>
            </TouchableOpacity>
          </View>
          <DoctorList specialty="Dermatology" />
        </View>

        {/* top orthopedic surgeons section */}
        <View className="px-4 mt-2">
          <View className="flex flex-row items-center justify-between mb-2">
            <Text className="font-bold text-md">
              Top Rated Orthopaedics Surgeons
            </Text>
            <TouchableOpacity>
              <Text className="text-[#045883] text-md">See All</Text>
            </TouchableOpacity>
          </View>
          <DoctorList specialty="Orthopedics" />
        </View>
      </ScrollView>
    );
  }
}

export default Index;
