import * as React from 'react';
import usePatchElement from 'antd/lib/_util/hooks/usePatchElement';
import type { ModalStaticFunctions } from '../confirm';
import { withConfirm, withError, withInfo, withSuccess, withWarn } from '../confirm';
import type { ModalFuncProps } from '../Modal';
import type { HookModalRef } from './HookModal';
import HookModal from './HookModal';

let uuid = 0;

interface ElementsHolderRef {
  patchElement: ReturnType<typeof usePatchElement>[1];
}

const ElementsHolder = React.memo(
  React.forwardRef<ElementsHolderRef>((_props, ref) => {
    const [elements, patchElement] = usePatchElement();
    React.useImperativeHandle(
      ref,
      () => ({
        patchElement
      }),
      []
    )
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{elements}</>
  })
)

export default function useModal(): [Omit<ModalStaticFunctions, 'warn'>, React.ReactElement] {
  const holderRef = React.useRef<ElementsHolderRef>(null as any);
  // 副作用
  const [actionQueue, setActionQueue] = React.useState<(() => void)[]>([]);

  React.useEffect(() => {
    if (actionQueue.length) {
      const cloneQueue = [...actionQueue];
      cloneQueue.forEach(action => {
        action();
      })

      setActionQueue([]);
    }
  }, [actionQueue]);

  // hook部分
  const getConfirmFunc = React.useCallback(
    (withFunc: (config: ModalFuncProps) => ModalFuncProps) =>
      function hookConfirm(config: ModalFuncProps) {
        uuid += 1;

        const modalRef = React.createRef<HookModalRef>();

        let closeFunc: Function;
        const modal = (
          <HookModal
            key={`modal-${uuid}`}
            config={withFunc(config)}
            ref={modalRef}
            afterClose={() => {
              closeFunc();
            }}
          />
        );

        closeFunc = holderRef.current?.patchElement(modal);

        return {
          destroy: () => {
            function destroyAction() {
              modalRef.current?.destroy();
            }

            if (modalRef.current) {
              destroyAction();
            } else {
              setActionQueue(prev => [...prev, destroyAction]);
            }
          },
          update: (newConfig: ModalFuncProps) => {
            function updateAction() {
              modalRef.current?.update(newConfig);
            }

            if (modalRef.current) {
              updateAction();
            } else {
              setActionQueue(prev => [...prev, updateAction]);
            }
          },
        };
      },
    [],
  );

  const fns = React.useMemo(
    () => ({
      info: getConfirmFunc(withInfo),
      success: getConfirmFunc(withSuccess),
      error: getConfirmFunc(withError),
      warning: getConfirmFunc(withWarn),
      confirm: getConfirmFunc(withConfirm),
    }),
    []
  );

  // eslint-disable-next-line react/jsx-key
  return [fns, <ElementsHolder ref={holderRef} />]
}

