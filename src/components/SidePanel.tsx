import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
// import { XMarkIcon } from '@heroicons/react/24/outline'
import './SidePanel.css';

interface SidePanelProps {
  stationID: string;
}

export const SidePanel = ({ stationID }: SidePanelProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="side-panel-dialog">
      <DialogBackdrop
        transition
        className="side-panel-backdrop"
      />

      <div className="side-panel-fixed-container">
        <div className="side-panel-absolute-container">
          <div className="side-panel-inner-container">
            <DialogPanel
              transition
              className="side-panel-dialog-panel"
            >
              <TransitionChild>
                <div className="side-panel-close-button-container">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="side-panel-close-button"
                  >
                    <span className="side-panel-invisible-span" />
                    <span className="sr-only">Close panel</span>
                  </button>
                </div>
              </TransitionChild>
              <div className="side-panel-content">
                <div className="side-panel-title">
                  <DialogTitle>Panel title</DialogTitle>
                </div>
                <div className="side-panel-body">{/* Your content here */}</div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
