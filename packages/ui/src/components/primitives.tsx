'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Bell,
  ChevronRight,
  LoaderCircle,
  Menu as MenuIcon,
  Search,
  UploadCloud,
} from 'lucide-react';
import {
  forwardRef,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';

import { cn } from '../utils/cn';

const buttonVariants = cva('ui-button', {
  variants: {
    size: { default: 'ui-button-default', icon: 'ui-button-icon', sm: 'ui-button-sm' },
    variant: {
      default: 'ui-button-primary',
      destructive: 'ui-button-destructive',
      ghost: 'ui-button-ghost',
      outline: 'ui-button-outline',
      secondary: 'ui-button-secondary',
    },
  },
  defaultVariants: { size: 'default', variant: 'default' },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input className={cn('ui-input', className)} ref={ref} {...props} />
  ),
);
Input.displayName = 'Input';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea className={cn('ui-input ui-textarea', className)} ref={ref} {...props} />
));
Textarea.displayName = 'Textarea';

export const Label = ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn('ui-label', className)} {...props} />
);

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <section className={cn('ui-card', className)} {...props} />
);
export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <header className={cn('ui-card-header', className)} {...props} />
);
export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('ui-card-content', className)} {...props} />
);
export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <footer className={cn('ui-card-footer', className)} {...props} />
);
export const Badge = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('ui-badge', className)} {...props} />
);
export const Alert = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('ui-alert', className)} role="alert" {...props} />
);
export const Separator = ({ className, ...props }: HTMLAttributes<HTMLHRElement>) => (
  <hr className={cn('ui-separator', className)} {...props} />
);
export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div aria-hidden="true" className={cn('ui-skeleton', className)} {...props} />
);
export const Spinner = ({ label = 'Carregando' }: { label?: string }) => (
  <span className="ui-spinner" role="status">
    <LoaderCircle aria-hidden="true" />
    <span className="ui-sr-only">{label}</span>
  </span>
);
export const Progress = ({ value = 0 }: { value?: number }) => (
  <div
    aria-label={`Progresso: ${value}%`}
    aria-valuemax={100}
    aria-valuemin={0}
    aria-valuenow={value}
    className="ui-progress"
    role="progressbar"
  >
    <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
  </div>
);
export const EmptyState = ({
  action,
  description,
  title,
}: {
  action?: ReactNode;
  description: string;
  title: string;
}) => (
  <div className="ui-empty-state">
    <h2>{title}</h2>
    <p>{description}</p>
    {action}
  </div>
);

export const SearchInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ 'aria-label': ariaLabel = 'Pesquisar', className, ...props }, ref) => (
    <label className={cn('ui-search-input', className)}>
      <Search aria-hidden="true" />
      <input aria-label={ariaLabel} ref={ref} type="search" {...props} />
    </label>
  ),
);
SearchInput.displayName = 'SearchInput';

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input className={cn('ui-checkbox', className)} ref={ref} type="checkbox" {...props} />
  ),
);
Checkbox.displayName = 'Checkbox';
export const Switch = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      className={cn('ui-switch', className)}
      ref={ref}
      role="switch"
      type="checkbox"
      {...props}
    />
  ),
);
Switch.displayName = 'Switch';
export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select className={cn('ui-input', className)} ref={ref} {...props} />
  ),
);
Select.displayName = 'Select';
export const RadioGroup = ({ children, label }: { children: ReactNode; label: string }) => (
  <fieldset className="ui-radio-group">
    <legend>{label}</legend>
    {children}
  </fieldset>
);
export const FormField = ({
  children,
  error,
  label,
}: {
  children: ReactNode;
  error?: string;
  label: string;
}) => {
  const errorId = useId();
  return (
    <div className="ui-form-field">
      <span className="ui-label">{label}</span>
      <div aria-describedby={error ? errorId : undefined}>{children}</div>
      {error ? (
        <span className="ui-validation-message" id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
};
export const Upload = ({
  label = 'Selecionar arquivo',
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) => (
  <label className="ui-upload">
    <UploadCloud aria-hidden="true" />
    <span>{label}</span>
    <input className="ui-sr-only" type="file" {...props} />
  </label>
);

export const Tooltip = ({ children, content }: { children: ReactNode; content: string }) => (
  <span className="ui-tooltip" data-tooltip={content}>
    {children}
  </span>
);
export const Avatar = ({ fallback, src }: { fallback: string; src?: string }) => (
  <span className="ui-avatar">
    {src ? <img alt="" src={src} /> : <span aria-label={fallback}>{fallback.slice(0, 2)}</span>}
  </span>
);
export const Breadcrumb = ({ items }: { items: string[] }) => (
  <nav aria-label="Breadcrumb">
    <ol className="ui-breadcrumb">
      {items.map((item, index) => (
        <li key={item}>
          {index > 0 ? <ChevronRight aria-hidden="true" /> : null}
          <span aria-current={index === items.length - 1 ? 'page' : undefined}>{item}</span>
        </li>
      ))}
    </ol>
  </nav>
);
export const Pagination = ({
  onPageChange,
  page,
  totalPages,
}: {
  onPageChange: (page: number) => void;
  page: number;
  totalPages: number;
}) => (
  <nav aria-label="Paginação" className="ui-pagination">
    <Button disabled={page <= 1} onClick={() => onPageChange(page - 1)} variant="outline">
      Anterior
    </Button>
    <span>
      Página {page} de {totalPages}
    </span>
    <Button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} variant="outline">
      Próxima
    </Button>
  </nav>
);
export const StatCard = ({ label, value }: { label: string; value: ReactNode }) => (
  <Card className="ui-stat-card">
    <span>{label}</span>
    <strong>{value}</strong>
  </Card>
);
export const MetricCard = StatCard;
export const ChartsWrapper = ({ children, label }: { children: ReactNode; label: string }) => (
  <div aria-label={label} className="ui-chart" role="img">
    {children}
  </div>
);
export const Timeline = ({ items }: { items: { id: string; label: string }[] }) => (
  <ol className="ui-timeline">
    {items.map((item) => (
      <li key={item.id}>{item.label}</li>
    ))}
  </ol>
);
export const Stepper = ({ current, steps }: { current: number; steps: string[] }) => (
  <ol className="ui-stepper">
    {steps.map((step, index) => (
      <li aria-current={index === current ? 'step' : undefined} key={step}>
        {step}
      </li>
    ))}
  </ol>
);
export const DataTable = ({
  columns,
  rows,
}: {
  columns: { key: string; label: string }[];
  rows: ReadonlyArray<Record<string, ReactNode>>;
}) => (
  <div className="ui-table-container">
    <table className="ui-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} scope="col">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={String(row.id ?? index)}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export const DataGrid = DataTable;
export const ColumnFilter = SearchInput;
export const DatePicker = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <Input type="date" {...props} />
);
export const TimePicker = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <Input type="time" {...props} />
);

export const Sidebar = ({ children }: { children: ReactNode }) => (
  <aside className="ui-sidebar">{children}</aside>
);
export const Header = ({ children }: { children: ReactNode }) => (
  <header className="ui-header">{children}</header>
);
export const Menu = ({ children }: { children: ReactNode }) => (
  <nav aria-label="Menu" className="ui-menu">
    <MenuIcon aria-hidden="true" />
    {children}
  </nav>
);
export const UserMenu = ({ children }: { children: ReactNode }) => (
  <div aria-label="Menu do usuário">{children}</div>
);
export const NotificationsMenu = ({ children }: { children: ReactNode }) => (
  <div aria-label="Notificações">
    <Bell aria-hidden="true" />
    {children}
  </div>
);
export const Accordion = ({ children }: { children: ReactNode }) => (
  <div className="ui-accordion">{children}</div>
);
export const Tabs = ({ children }: { children: ReactNode }) => (
  <div className="ui-tabs">{children}</div>
);
export const Drawer = Card;
export const Sheet = Card;
export const Dialog = Card;
export const Popover = Card;
export const Toast = Alert;
export const NavigationMenu = Menu;
export const Dropdown = Menu;
export const CommandPalette = SearchInput;
export const TreeView = ({ children }: { children: ReactNode }) => (
  <div role="tree">{children}</div>
);
export const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => <form {...props} />;
export const ValidationMessage = ({ children }: { children: ReactNode }) => (
  <span className="ui-validation-message" role="alert">
    {children}
  </span>
);
