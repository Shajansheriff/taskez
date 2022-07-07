import { FocusEventHandler, useEffect, useRef, useState } from "react";
import Textarea from "rc-textarea";
import { trpc } from "../../utils/trpc";
import { Status } from "@prisma/client";

export function AddTask({ status }: { status: Status }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>(null);
  const context = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation(["task.create"], {
    onSuccess: () => {
      setIsOpen(false);
      context.invalidateQueries(["task.board"]);
    },
  });

  useEffect(() => {
    if (isOpen) {
      ref.current?.focus();
    }
  }, [isOpen]);

  const onBlur: FocusEventHandler<HTMLTextAreaElement> = ({
    currentTarget: { value },
  }) => {
    const name = value.trim();
    if (name) {
      mutate({ name, status });
    }
    setIsOpen(false);
  };

  return isOpen ? (
    <Textarea
      ref={ref}
      disabled={isLoading}
      onBlur={onBlur}
      onPressEnter={(e) =>
        mutate({ name: e.currentTarget.value.trim(), status })
      }
      placeholder="Give your task a title"
      className="p-4 text-sm rounded-lg outline-primary"
    />
  ) : (
    <button
      onClick={() => {
        setIsOpen(true);
      }}
      className="bg-[#ECF3F3] text-center text-primary outline-primary py-3"
    >
      +
    </button>
  );
}
