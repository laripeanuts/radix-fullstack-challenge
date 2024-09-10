import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { EquipmentStatus } from '@/@types/entities/equipment';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { InputError } from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEquipmentsCreate } from '@/http/queries/equipments/create';
import { useState } from 'react';
import {
  createEquipmentFormSchema,
  CreateEquipmentFormSchema,
} from './create-equipment-schema';

const options = [
  {
    value: 'OPERATIONAL',
    label: 'Operational',
  },
  {
    value: 'MAINTENANCE',
    label: 'Maintenance',
  },
  {
    value: 'OUT_OF_SERVICE',
    label: 'Out of service',
  },
];

type CreateEquipmentDialogProps = {
  refetch: () => void;
};

export const CreateEquipmentDialog = ({
  refetch,
}: CreateEquipmentDialogProps) => {
  const { mutate: equipmentsCreate, isPending } = useEquipmentsCreate();
  const [isOpened, setIsOpened] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<CreateEquipmentFormSchema>({
    resolver: zodResolver(createEquipmentFormSchema),
  });

  const onSubmit = (data: CreateEquipmentFormSchema) => {
    equipmentsCreate(data, {
      onSuccess: (data) => {
        if (data) {
          toast({
            title: 'Success!',
            description: 'Equipment created successfully',
            variant: 'success',
          });
        }

        refetch();
        setIsOpened(false);
        reset();
      },
      onError: (error) => {
        let description = 'An error occurred';

        if (error.message) {
          description = 'This identifier is already in use';
        }

        toast({
          title: 'Error!',
          description,
          variant: 'destructive',
        });
      },
    });
  };

  const handleStatusSelection = (value: string) => {
    setValue('status', value as EquipmentStatus);
  };

  const nameError = errors.name?.message;
  const descriptionError = errors.description?.message;
  const statusError = errors.status?.message;
  const isLoading = isSubmitting || isPending;

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setIsOpened(true)}>
          <PlusCircle className="w-4 h-4 mr-2" />
          <span>Create equipment</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create equipment</DialogTitle>
            <DialogDescription>
              Add a new equipment to our system
            </DialogDescription>
          </DialogHeader>
          <div
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-4"
          >
            <div className="flex items-center w-full gap-2">
              <div className="flex items-end justify-between w-24">
                <Label htmlFor="name">Identifier</Label>
              </div>
              <Input
                id="id"
                placeholder="EQ-12345"
                className="w-[260px]"
                {...register('id')}
              />
            </div>
            <div className="flex items-center w-full gap-2">
              <Label className="w-24" htmlFor="name">
                Name
              </Label>
              <div className="flex flex-col items-start justify-between gap-1">
                <Input
                  id="name"
                  placeholder="Sensor "
                  className="w-[260px]"
                  {...register('name')}
                />
                {nameError && <InputError error={nameError} />}
              </div>
            </div>
            <div className="flex items-center w-full gap-2">
              <Label className="w-24" htmlFor="description">
                Description
              </Label>
              <div className="flex flex-col items-start justify-between gap-1">
                <Input
                  id="description"
                  placeholder="Get the temperature of the room"
                  className="w-[260px]"
                  {...register('description')}
                />
                {descriptionError && <InputError error={descriptionError} />}
              </div>
            </div>
            <div className="flex items-center w-full gap-2">
              <Label htmlFor="status" className="w-24">
                Status
              </Label>
              <div className="flex flex-col items-start justify-between gap-1">
                <Select onValueChange={handleStatusSelection}>
                  <SelectTrigger className="w-[268px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <SelectLabel className="flex justify-start">
                            {option.label}
                          </SelectLabel>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {statusError && <InputError error={statusError} />}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-[260px]"
              disabled={isLoading || isValid}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                'Save new equipment'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
