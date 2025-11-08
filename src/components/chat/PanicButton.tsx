import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useTranslation } from 'react-i18next';

type Props = {
  onConfirm?: () => void;
};

const PanicButton = ({ onConfirm }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
    onConfirm?.();
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        startIcon={<WarningAmberIcon />}
        onClick={() => setOpen(true)}
        sx={{ minHeight: 44 }}
      >
        {t('pages.chat.panic')}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="panic-dialog-title">
        <DialogTitle id="panic-dialog-title">{t('pages.chat.panicConfirmTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('pages.chat.panicConfirmBody')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t('common.cancel')}</Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            {t('pages.chat.panicConfirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PanicButton;
