import Editor from "@/components/editor/editor";
import Notification from "@/components/ui/notification";
import { STATUS } from "@/constants/common";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import classes from "./post-create.module.css";
import { uploadImage } from "@/lib/api-utils";

export default function PostCreate() {
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    "https://via.placeholder.com/200"
  );
  const [disableBtn, setDisableBtn] = useState(false);

  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleChangeImage = async (e) => {
    try {
      setDisableBtn(true);

      const selectedImage = e.target.files[0];
      const data = await uploadImage(selectedImage);

      if (data.ok) {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagePreview(reader.result);
          }
        };
        reader.readAsDataURL(selectedImage);

        setImage(data.url);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisableBtn(false);
    }
  };

  const submitForm = async (data) => {
    const values = {
      ...data,
      thumbnail: image,
    };
    setRequestStatus(STATUS.PENDING);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      setRequestStatus(STATUS.SUCCESS);
    } else {
      setRequestStatus(STATUS.ERROR);
    }
  };

  useEffect(() => {
    if (requestStatus === STATUS.SUCCESS || requestStatus === STATUS.ERROR) {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  let notification;

  if (requestStatus === STATUS.PENDING) {
    notification = {
      status: STATUS.PENDING,
      title: "Sending post...",
      message: "Your post is on its way!",
    };
  }

  if (requestStatus === STATUS.SUCCESS) {
    notification = {
      status: STATUS.SUCCESS,
      title: "Success!",
      message: "Post sent successfully!",
    };
  }

  if (requestStatus === STATUS.ERROR) {
    notification = {
      status: STATUS.ERROR,
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <div className={classes.content}>
      <h1 className={classes.title}>Create Post</h1>
      <Box>
        <form onSubmit={handleSubmit(submitForm)}>
          {/* TITLE */}
          <FormControl mt={4}>
            <FormLabel>Title</FormLabel>
            <Controller
              control={control}
              name="title"
              defaultValue=""
              rules={{
                required: "This field is required",
                // minLength: {
                //   value: 12,
                //   message: "This input must exceed 11 characters",
                // },
              }}
              render={({ field }) => (
                <Input
                  isInvalid={errors.title?.type}
                  errorBorderColor={errors.title?.type ? "red.500" : undefined}
                  {...field}
                />
              )}
            />
            {errors.title?.type && (
              <Text fontSize="md" color="red.500">
                {errors.title?.message}
              </Text>
            )}
          </FormControl>
          {/* ABSTRACT */}
          <FormControl mt={4}>
            <FormLabel>Abstract</FormLabel>
            <Controller
              control={control}
              name="abstract"
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Textarea
                  isInvalid={errors.abstract?.type}
                  errorBorderColor={
                    errors.abstract?.type ? "red.500" : undefined
                  }
                  {...field}
                />
              )}
            />
            {errors.abstract?.type && (
              <Text fontSize="md" color="red.500">
                {errors.abstract?.message}
              </Text>
            )}
          </FormControl>
          {/* DESCRIPTION */}
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>

            <Controller
              control={control}
              name="description"
              defaultValue=""
              render={({ field }) => (
                <Editor {...field} onChange={field.onChange} />
              )}
            />
          </FormControl>
          {/* IMAGE */}
          <FormControl mt={4}>
            <FormLabel>Thumbnail</FormLabel>

            <Controller
              control={control}
              name="thumbnail"
              defaultValue=""
              render={({ field }) => (
                <React.Fragment>
                  <Image
                    {...field}
                    fallbackSrc="https://via.placeholder.com/200"
                    alt="thumbnail"
                    src={imagePreview}
                    boxSize={200}
                  />

                  {/* <Input type="file" onChange={handleChangeImage} isDisabled /> */}
                  <input
                    type="file"
                    onChange={handleChangeImage}
                    disabled={disableBtn}
                  />
                </React.Fragment>
              )}
            />
          </FormControl>
          <Button mt={4} w="full" type="submit">
            Submit
          </Button>
        </form>
      </Box>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </div>
  );
}
