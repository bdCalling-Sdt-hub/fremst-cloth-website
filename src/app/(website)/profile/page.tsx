"use client";

import { useState } from "react";
import {
  Button,
  Form,
  Modal,
  Table,
  Input,
  Tabs,
  Upload,
  UploadFile,
  Tooltip,
} from "antd";
import Image from "next/image";
import moment from "moment";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { PiSuitcaseSimple } from "react-icons/pi";
import { FaRegBuilding } from "react-icons/fa";
import {
  MdOutlineEmail,
  MdOutlineLocalPhone,
  MdOutlineLocationOn,
} from "react-icons/md";
import { TbShoppingCartCheck } from "react-icons/tb";
import { IoIosCalculator } from "react-icons/io";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import profileBanner from "../../../assets/profileBanner.png";

import Heading from "@/components/shared/Heading";
import toast from "react-hot-toast";
import { LuUpload } from "react-icons/lu";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/apiSlices/authSlice";
import { getImageUrl } from "@/utils/getImageUrl";
import { useOrdersByUserQuery } from "@/redux/apiSlices/orderSlice";

const ProfilePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchText, setSearchText] = useState("");

  const { data: userProfileData, isLoading } =
    useGetUserProfileQuery(undefined);
  const { data: orderData, isLoading: orderLoading } = useOrdersByUserQuery(
    userProfileData?.data?._id
  );
  const [updateProfile] = useUpdateUserProfileMutation();

  if (isLoading || orderLoading) {
    return <div>Loading...</div>;
  }

  const userDetails = userProfileData?.data || [];
  const userProfile = userProfileData?.data?.user || [];
  const orders = orderData?.data?.data || [];
  console.log(userDetails);

  const showModal = () => {
    if (!userProfile) {
      toast.error("User data not available");
      return;
    }

    form.setFieldsValue({
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      phone: userProfile?.contact || "",

      streetAddress: userProfile?.address?.streetAddress || "",
      city: userProfile?.address?.city || "",
      postalCode: userProfile?.address?.postalCode || "",

      company: userDetails?.company?.user?.name || "",
      designation: userDetails?.designation || "",
    });

    if (userProfile?.profile) {
      setFileList([
        {
          uid: "-1",
          name: "profile.png",
          status: "done",
          url: getImageUrl(userProfile?.profile),
        },
      ]);
    }

    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form before submission

      const formData = new FormData();

      const data = {
        name: values.name,
        email: values.email,
        contact: values.phone,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          postalCode: values.postalCode,
        },
        designation: values.designation,
      };

      formData.append("data", JSON.stringify(data));

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      const res = await updateProfile(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed!");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // const filteredOrderHistory = profile?.orderHistory?.filter((order: any) => {
  //   return order.productName.toLowerCase().includes(searchText.toLowerCase());
  // });

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => (
        <Tooltip title={text}>
          <span>{text?.slice(0, 10)}</span>
        </Tooltip>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "items",
      key: "items",
      render: (_: any, record: any) => (
        <span>{record?.items[0]?.product?.name}</span>
      ),
    },
    {
      title: "Item",
      dataIndex: "items",
      key: "items",
      render: (items: any) => <span>{items?.length}</span>,
    },
    {
      title: "Price",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <span
          className={
            text === "completed"
              ? "text-green-500"
              : text === "dispatched"
              ? "text-blue-500"
              : "text-red-500"
          }
        >
          {text}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => <span>{moment(date).format("L")}</span>,
    },
  ];

  const uploadProps = {
    beforeUpload: (file: UploadFile) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        toast.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size ? file.size / 1024 / 1024 < 2 : false;
      if (!isLt2M) {
        toast.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: handleChange,
    fileList,
    maxCount: 1,
  };

  return (
    <div className="max-w-[1500px] p-7 mx-auto my-10 md:flex gap-5 w-full">
      <div className="md:w-[35%]">
        <div className="border rounded-2xl shadow-md relative">
          <Image
            className="w-full rounded-t-2xl h-[180px]"
            src={profileBanner}
            alt="profileBanner"
          />
          <div className="absolute flex flex-col items-center top-12 left-5 ">
            <div className="w-48 h-48 border-8 rounded-full border-white">
              <Image
                className="object-cover w-full h-full rounded-full"
                src={getImageUrl(userProfile?.profile)}
                alt="profileImg"
                width={200}
                height={200}
              />
            </div>
            <Heading className="text-md flex items-center gap-4">
              {userProfile?.name}{" "}
              <span>
                <BsFillPatchCheckFill color="#1e88e5" size={30} />
              </span>
            </Heading>
          </div>
          <div className="mt-36 px-8 mb-8">
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <PiSuitcaseSimple />
              </span>
              {userDetails?.designation}
            </h1>
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <FaRegBuilding />
              </span>
              {userDetails?.company?.user?.name || "Unknown"}
            </h1>
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <MdOutlineEmail />
              </span>
              {userProfile?.email || "Unknown"}
            </h1>
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <MdOutlineLocalPhone />
              </span>
              {userProfile?.contact || "Unknown"}
            </h1>
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <MdOutlineLocationOn />
              </span>
              {userProfile?.address
                ? userProfile?.address?.streetAddress
                  ? `${userProfile?.address?.streetAddress} ${userProfile?.address?.city} ${userProfile?.address?.postalCode}`
                  : ""
                : "N/A"}
            </h1>
          </div>
        </div>
        <Button
          onClick={showModal}
          className="w-full !border-primary !text-primary !py-5 hover:!bg-primary hover:!text-white my-7"
        >
          Edit Profile
        </Button>

        <Modal
          title="Edit Profile"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          okText="Update"
          okButtonProps={{
            style: { backgroundColor: "#1e88e5", borderColor: "#1e88e5" },
          }}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Edit Profile" key="1">
              <Form form={form} layout="vertical">
                <div className="flex justify-between items-center">
                  <div style={{ width: "48%" }}>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[{ required: true }]}
                    >
                      <Input style={{ height: "50px", width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[{ required: true, type: "email" }]}
                    >
                      <Input style={{ height: "50px", width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      rules={[{ required: true }]}
                    >
                      <Input style={{ height: "50px", width: "100%" }} />
                    </Form.Item>
                    <div className="flex gap-3">
                      <Form.Item
                        name="streetAddress"
                        label="Street Address"
                        rules={[{ required: true }]}
                        style={{ width: "33%" }}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="city"
                        label="City"
                        rules={[{ required: true }]}
                        style={{ width: "33%" }}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="postalCode"
                        label="Postal Code"
                        rules={[{ required: true }]}
                        style={{ width: "33%" }}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <div style={{ width: "48%" }}>
                    <Form.Item label="Profile Image">
                      <Upload
                        {...uploadProps}
                        listType="picture-card"
                        className="upload-full-width"
                      >
                        {fileList.length < 1 && (
                          <div>
                            <LuUpload />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      name="company"
                      label="Company Name"
                      rules={[{ required: true }]}
                    >
                      <Input style={{ height: "50px", width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      name="designation"
                      label="Designation"
                      rules={[{ required: true }]}
                    >
                      <Input style={{ height: "50px", width: "100%" }} />
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Change Password" key="2">
              <Form form={form} layout="vertical">
                <Form.Item
                  name="currentPassword"
                  label="Current Password"
                  rules={[{ required: true }]}
                >
                  <Input.Password style={{ height: "50px", width: "100%" }} />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[{ required: true }]}
                >
                  <Input.Password style={{ height: "50px", width: "100%" }} />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["newPassword"]}
                  hasFeedback
                  rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password style={{ height: "50px", width: "100%" }} />
                </Form.Item>
              </Form>
            </Tabs.TabPane>
          </Tabs>
        </Modal>

        <div className="shadow-md">
          <h1 className="bg-primary text-white px-10 py-3 rounded-t-2xl font-semibold">
            Budget Details
          </h1>
          <div className="p-5">
            <h1 className="text-lg">
              Assigned Budget: <span>${userDetails?.budget}</span>
            </h1>
            <h1 className="text-lg">
              Budget Duration : <span>{userDetails?.duration} Months</span>
            </h1>
            <h1 className="text-lg">
              Assigned Date:{" "}
              <span>{moment(userDetails?.budgetAssignedAt).format("LL")}</span>
            </h1>
            <h1 className="text-lg">
              Expiration Date:{" "}
              <span>{moment(userDetails?.budgetExpiredAt).format("LL")}</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="md:w-[65%] mt-10 md:mt-0">
        <div className="grid grid-col-1 md:grid-cols-4 gap-5">
          <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
            <div className="p-6 rounded-2xl bg-[#f3f3ff]">
              <TbShoppingCartCheck size={40} />
            </div>
            <h1 className="text-lg text-gray-600">Total Order</h1>
            <h1 className="text-2xl font-bold">{userDetails?.totalOrders}</h1>
          </div>
          <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
            <div className="p-6 rounded-2xl bg-[#fff6da]">
              <IoIosCalculator size={40} />
            </div>
            <h1 className="text-lg text-gray-600">Total Budget</h1>
            <h1 className="text-2xl font-bold">{userDetails?.totalBudget}</h1>
          </div>
          <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
            <div className="p-6 rounded-2xl bg-[#edf6fd]">
              <RiMoneyCnyCircleLine size={40} />
            </div>
            <h1 className="text-lg text-gray-600">Total Spend</h1>
            <h1 className="text-2xl font-bold">
              {userDetails?.totalSpentBudget?.toFixed(2)}
            </h1>
          </div>
          <div className="flex flex-col hover:shadow-xl px-8 rounded-2xl shadow-md py-6 gap-3 items-center">
            <div className="p-6 rounded-2xl bg-[#fce7e7]">
              <GiMoneyStack size={40} />
            </div>
            <h1 className="text-lg text-gray-600">Remaining Budget</h1>
            <h1 className="text-2xl font-bold">
              {userDetails?.budgetLeft?.toFixed(2)}
            </h1>
          </div>
        </div>

        <Heading className="mt-10">My Order History</Heading>
        <div className="flex justify-between items-center my-5">
          <Input
            placeholder="Search by product name"
            value={searchText}
            onChange={handleSearch}
            style={{ width: "30%" }}
          />
        </div>

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
