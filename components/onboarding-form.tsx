"use client";

import { useForm,SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { type OnboardingFormData } from '@/types';
import { UserOnboardingSchema } from '@/lib/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { safeAsync } from '@/lib/utils';
import { handleUserOnboarding } from '@/server/actions';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Onboarding() {

    const router = useRouter()
    const form = useForm<OnboardingFormData>({
        resolver: zodResolver(UserOnboardingSchema),
        defaultValues: {
            fullName: "",
            nationalID: "",
            phone: ""
        }
    });

    const onValidSubmit : SubmitHandler<OnboardingFormData> = async (data) => {

        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const [error] = await safeAsync(handleUserOnboarding(formData))

        if (error) {
            console.error(error)
            return
        }
        router.push("/dashboard")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onValidSubmit)} className="max-w-xl w-full shadow-md rounded-lg space-y-6 p-6">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your full name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nationalID"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>National ID</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your 8-digit National ID"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your 8-digit phone number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full mt-4" disabled={form.formState.isSubmitting}>
                    Complete Onboarding
                </Button>
            </form>
        </Form>
    );

}