from datetime import datetime, timedelta, timezone
def convert_to_clean_number(request_time):
    # First convert to datetime
    time_data = datetime.strptime(request_time.split(" (")[0], "%a %b %d %Y %H:%M:%S GMT%z")
    
    # Convert to string and remove timezone part
    time_str = str(time_data).split("+")[0]
    
    # Remove all spaces, hyphens, and colons
    clean_number = time_str.replace(" ", "").replace("-", "").replace(":", "")
    
    return clean_number

def get_before_after_dates(date_number, days_before=1, days_after=1):
    # Convert the number string back to datetime
    # Format: YYYYMMDDHHMMSS
    date_str = f"{date_number[:4]}-{date_number[4:6]}-{date_number[6:8]} {date_number[8:10]}:{date_number[10:12]}:{date_number[12:]}"
    current_date = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
    
    # Calculate before and after dates
    before_date = current_date - timedelta(days=days_before)
    after_date = current_date + timedelta(days=days_after)
    
    # Convert back to clean number format
    before_number = before_date.strftime("%Y%m%d%H%M%S")
    after_number = after_date.strftime("%Y%m%d%H%M%S")
    
    return before_number, after_number

## Example usage:
# date_number = "20250121013137"
# before, after = get_before_after_dates(date_number)
# print(f"Day before: {before}")  # Output: 20250120013137
# print(f"Day after: {after}")    # Output: 20250122013137

# # You can also specify different number of days:
# before, after = get_before_after_dates(date_number, days_before=2, days_after=3)
# print(f"Two days before: {before}")  # Output: 20250119013137
# print(f"Three days after: {after}")  # Output: 20250124013137
