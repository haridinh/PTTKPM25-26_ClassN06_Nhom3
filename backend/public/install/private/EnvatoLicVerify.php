<?php

class EnvatoLicVerify
{
    // domain
    private $domain;

    // expire date
    private $expire_date;

    // update day
    private $update_day;

    // message
    private $message;

    // user id
    private $user_id;

    // purchase key
    private $purchase_key;

    // product key
    private $product_key = '21754644';

    // license
    private $license = 'standard';

    // log path
    private $log_path = null;

    // check days
    private $check_days = [9, 10, 11];

    // api domain
    private $api_domain = 'secure.bdtask.com';

    // api url
    private $api_url = 'https://secure.bdtask.com/alpha/class.purchasev3.php';

    // whitelist domain
    private $whitelist = [];

    // full domain
    private $full_domain;

    // is https
    private $is_https;

    public function __construct()
    {
        $timezone = date_default_timezone_get();
        date_default_timezone_set($timezone);
        // set log_path
        $this->log_path = base_dir('storage/framework/envato/license.log');
        //set initial values
        $this->domain      = $this->domain();
        $this->full_domain = $this->full_domain();
        $this->is_https    = is_https() ? '1' : '0';
        //expire date
        $this->expire_date = @date('Y-m-d', @strtotime('+10 year'));
        // check day
        $this->update_day = @date('d');
    }

    private function domain()
    {

        $url = (is_https() ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'];
        $url .= str_replace(basename($_SERVER['SCRIPT_NAME']), '', $_SERVER['SCRIPT_NAME']);

        // regex can be replaced with parse_url
        preg_match("/^(https|http|ftp):\/\/(.*?)\//", "$url/", $matches);

        if ((bool) ip2long($matches[2])) {
            return $matches[2];
        } else {
            $parts = explode('.', $matches[2]);
            $tld   = array_pop($parts);
            $host  = array_pop($parts);

            if (strlen($tld) == 2 && strlen($host) <= 3) {
                $tld  = "$host.$tld";
                $host = array_pop($parts);
            }

            return "$host.$tld";
        }

    }

    private function full_domain()
    {
        $url = (is_https() ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'];
        $url .= str_replace(basename($_SERVER['SCRIPT_NAME']), '', $_SERVER['SCRIPT_NAME']);

        $details     = parse_url($url);
        $sub_folders = explode('/', $details['path']);

        $full_url = '';

// if install in subfolder then take full_domian with that sub-folder
        if (count($sub_folders) >= 2) {
            if ($sub_folders[1] == 'install') {
                $full_url = $_SERVER['HTTP_HOST'] . '/';
            } else {
                $full_url = $_SERVER['HTTP_HOST'] . $details['path'];
                $full_url = str_replace('install/', '', $full_url);
            }

        } else {
            $full_url = $_SERVER['HTTP_HOST'] . '/';
        }

        return $full_url;
    }

    private function response()
    {
        if ($this->purchase_key == null) {
            return false;
        }

        $url = "$this->api_url?product_key=$this->product_key&purchase_key=$this->purchase_key&domain=$this->domain&full_domain=$this->full_domain&user_id=$this->user_id&http_check=$this->is_https";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_USERAGENT, @$_SERVER['USER_AGENT']);
        $result = curl_exec($ch);

        return json_decode($result, true);
    }

    private function response_success()
    {
        if (empty(get_purchase_data('purchase_key'))) {
            return false;
        }

        $url = "$this->api_url?product_key=" . get_purchase_data('product_key') . '&purchase_key=' . get_purchase_data('purchase_key') . '&domain=' . get_purchase_data('domain') . '&full_domain=' . get_purchase_data('full_domain') . '&user_id=' . get_purchase_data('user_id') . '&http_check=' . $this->is_https . '&launch=1';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_USERAGENT, @$_SERVER['USER_AGENT']);
        $result = curl_exec($ch);

        return json_decode($result, true);
    }

    //filter all input data
    public function filter_purchase_key($purchase_key)
    {
        $length = strlen($purchase_key);

        if ($length >= 20 && $length <= 40) {
            return true;
        }

        return false;
    }

    // Verify Product Purchase
    public function verify_purchase($data)
    {
        set_purchase_data('product_key', $this->product_key);
        set_purchase_data('purchase_key', 'xx');
        set_purchase_data('domain', $this->domain);
        set_purchase_data('full_domain', $this->full_domain);
        set_purchase_data('user_id', 'developer');
        set_purchase_data('whitelist', ['localhost']);
        set_purchase_data('purchase_key_used', false);

        session_set('envato_license', true);
        header('location: ./?a=env_requirement');
        exit;
    }

    public function launch_application()
    {
        return true;
    }

    private function serverAliveOrNot()
    {

        if ($pf = @fsockopen($this->api_domain, 443)) {
            fclose($pf);
            set_purchase_data('serverAliveOrNot', true);

            return true;
        } else {
            set_purchase_data('serverAliveOrNot', false);

            return false;
        }

    }

    public function get_product_key()
    {
        return $this->product_key;
    }

}
