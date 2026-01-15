import { checkPasswordRequirements } from "@/utils/authValidation";
import styles from "./PasswordStrengthIndicator.module.css";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator = ({
  password,
}: PasswordStrengthIndicatorProps) => {
  const requirements = checkPasswordRequirements(password);
  const metCount = requirements.filter((req) => req.met).length;
  const totalCount = requirements.length;

  // Không hiển thị gì nếu mật khẩu rỗng
  if (!password) return null;

  return (
    <div className={styles.strengthIndicator}>
      <div className={styles.strengthBar}>
        <div
          className={styles.strengthProgress}
          style={{
            width: `${(metCount / totalCount) * 100}%`,
            backgroundColor:
              metCount === totalCount
                ? "#2ecc71"
                : metCount >= 3
                ? "#f39c12"
                : "#e74c3c",
          }}
        />
      </div>
      <div className={styles.requirements}>
        {requirements.map((req, index) => (
          <div
            key={index}
            className={`${styles.requirement} ${req.met ? styles.met : ""}`}
          >
            <span className={styles.icon}>{req.met ? "✓" : "○"}</span>
            <span className={styles.label}>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
