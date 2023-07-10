import { FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

export default function FormPost() {
  const { control } = useForm();

  return (
    <FormControl>
      <FormLabel></FormLabel>
    </FormControl>
  );
}
