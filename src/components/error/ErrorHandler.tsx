import { useToast } from "@/hooks";
import { observableError, type TToastContent } from "@/utils";
import { useCallback, useEffect } from "react";

export function ErrorHandler() {
  const { toast } = useToast();

  const onError = useCallback(
    (toastContent: TToastContent) => {
      const { title, description } = toastContent;

      toast({
        title,
        description,
        variant: "destructive",
      });
    },
    [toast]
  );

  useEffect(() => {
    observableError.subscribe(onError);

    return () => observableError.unsubscribe(onError);
  }, [onError]);

  return null;
}
